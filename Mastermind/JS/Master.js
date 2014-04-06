/* Libreria donde controlaremos todo lo relacionado con la programacion interna del programa */

var master = 
{
	numOK : null,
	numParc : null,
	numKO : null,
	arrUs : null,
	arrOr : null,
	arrPist : null,
	arrUsCop : null,
	arrOrCop : null,

	//Funcion que nos dice cuantos colores correctos ha puesto el usuario, se guardan en numOK.
	cuantasOK : function(){
		master.numOK = 0;
		master.numParc = 0;
		master.numKO = 0;
		master.arrOrCop = master.arrOr;
		master.arrUsCop = master.arrUs;
		var i = 0;
		while(i<master.arrUsCop.length)
		{
			if(master.arrUsCop[i] == master.arrOrCop[i])
			{
				master.arrOrCop = utils.eliminarItemArray(master.arrOrCop,i);	
				master.arrUsCop = utils.eliminarItemArray(master.arrUsCop,i);
				master.numOK++;	
			}
			else
				i++;
		}
	},

	//Funcion que nos dice cuantos colores correctos en mala posicion ha puesto el usuario y cuantos erroneos. se guardan en numParc y numKO respectivamente
	cuantasKO : function(){
		var i =0;
		while(i<master.arrUsCop.length)
		{
			var quitado = false;
			for(j=0;j<master.arrOrCop.length;j++)
			{
				if(master.arrUsCop[i] == master.arrOrCop[j])
				{
					master.arrOrCop = utils.eliminarItemArray(master.arrOrCop,j);	
					master.arrUsCop = utils.eliminarItemArray(master.arrUsCop,i);
					quitado = true;
					master.numParc++;	
				}
			}
			if(!quitado)
			{
				master.arrUsCop = utils.eliminarItemArray(master.arrUsCop,i);
				master.numKO++;
			}
		}
		utils.alert("be: "+master.numOK+" - parcialBe: "+master.numParc+" - mal: "+master.numKO);	
	},

	//funcion que comprueba los valores de la caja rapida, y si son correctos, los guarda.
	comprobarCajaRapida : function()
	{
		var val  = $("#rapid").val();
		if(/^[0-6]{5}$/.test(val))
		{
			if(master.arrUs != null)
				master.arrUs = master.arrUs.splice(0,master.length);
			master.arrUs = new Array();
			for(i=0;i<val.length;i++)
				master.arrUs.push(val[i]);
			config.teclado = true;
			master. prepararTurno();
		}
		else
			masterUI.mensajeErrorCaja();
	},

	//Funcion que genera el codigo de colores que el usuario tendra que averiguar.
	generarCodigoOculto : function(){
		master.arrOr = null;
		master.arrOr = new Array();
		for(i=0;i<config.numHuecos;i++)
		{
			master.arrOr.push(String(Math.floor((Math.random()*6)+1)));
		}
		utils.alert(master.arrOr);
	},

	//funcion que genera el array de pistas para mostrarlo por pantalla
	generaArrayPistas : function()
	{
		master.arrPist = new Array();
		for(l=0;l<master.numOK;l++)
			master.arrPist.push("OK")
		for(l=0;l<master.numParc;l++)
			master.arrPist.push("KO")
		for(l=0;l<master.numKO;l++)
			master.arrPist.push("NO")
	},

	//Funcion que mira si estamos en el primer turno para configurar la partida, y si no ,pasamos turno.
	prepararTurno : function()
	{
		if(!config.jugando)
		{
			//ponemos a true el booleano que nos dice si estamos jugando o no y seteamos la cookie si aun no hemos empezado a jugar
			config.jugando = !config.jugando;
			config.turnoActual = 0;
			config.turnos = $("#slider").slider("option", "value");
			cookies.setCookie("turnosMax",config.turnos,1);
			masterUI.cambiarSlider();
		    masterUI.cambiarTextoBoton();
		}
		
		//pasamos turno
		master.pasaTurno(config.teclado);
		master.compruebaTurnos();
		masterUI.quitarColoresUsuario();
	},

	//Funcion que gestiona el paso de turno
	pasaTurno : function(teclado)
	{
		//Pasamos turno en nuestro contador interno y lo mostramos en el slider.
		masterUI.ponerValorSlider(((config.turnos-config.turnoActual)-1));
		config.turnoActual++;
		$("#rapid").val("");

		//Si no se ha utilizado el atajo de teclado, cogemos los colores que ha introducido el usuario
		if(!teclado)
			masterUI.cogerColoresUsuario();

		//comprobamos cuantas se han acertado y lo mostramos en la informacion.
		master.cuantasOK();
		master.cuantasKO();
		master.generaArrayPistas();
		masterUI.anadirInfoTurno(config.turnoActual,master.arrUs);
		masterUI.anadirPistasTurno(config.turnoActual,master.arrPist);

		//Mostramos el mensaje de hemos ganado si se da el caso
		if(master.numOK == 5)
			masterUI.muestraModal("Has ganado",1);

		//Sacamos el debug si esta activo
		utils.alert("------------------------");
		utils.alert("turno:"+config.turnoActual);
		utils.alert("array usuario :"+master.arrUs);
		utils.alert("array original :"+master.arrOr);
		utils.alert("array pistas :"+master.arrPist);
		utils.alert("------------------------");
	},

	//Funcion que mira si se han acabado los turnos de la partida actual
	compruebaTurnos : function()
	{
		if(config.turnoActual == config.turnos)
		{
			masterUI.muestraModal("Has perdido",2);
			return false;
		}
		else 
			return true;
	},

	//funcion que reinicia las variables para volver a jugar
	reiniciaJuego : function()
	{
		config.jugando = false;
		config.turnoActual = 0;
		masterUI.borrarListaPistas();
		masterUI.cambiarTextoBoton();
		masterUI.inicializaSlider();
		master.generarCodigoOculto();
		masterUI.subirArriba();
	}
}