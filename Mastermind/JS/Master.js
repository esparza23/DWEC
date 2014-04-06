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

	//Funcion que nos dice cuantos colores correctos ha puesto el usuario, pero en mala posicion.
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

	//Funcion que nos dice cuantos colores correctos en mala posicion ha puesto el usuario y cuantos erroneos.
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
			//master.pasaTurno(false);
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

	//Funcion 
	prepararTurno : function()
	{
		//seteamos la cookie si aun no hemos empezado a jugar
		if(!config.jugando)
		{
			//ponemos a true el booleano que nos dice si estamos jugando o no.
			config.jugando = !config.jugando;
			config.turnoActual = 0;
			config.turnos = $("#slider").slider("option", "value");
			cookies.setCookie("turnosMax",config.turnos,1);
			masterUI.cambiarSlider();
		    masterUI.cambiarTextoBoton();
		}
		masterUI.ponerValorSlider(((config.turnos-config.turnoActual)-1));
		
		//pasamos turno
		master.pasaTurno(config.teclado);
		master.compruebaTurnos();
		masterUI.quitarColoresUsuario();
	},

	//Funcion que gestiona el paso de turno
	pasaTurno : function(teclado)
	{
		config.turnoActual++;
		$("#rapid").val("");
		if(!teclado)
			masterUI.cogerColoresUsuario();
		master.cuantasOK();
		master.cuantasKO();
		master.generaArrayPistas();
		masterUI.anadirInfoTurno(config.turnoActual,master.arrUs);
		masterUI.anadirPistasTurno(config.turnoActual,master.arrPist);
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
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	}
}