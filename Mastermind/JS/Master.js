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

	//consigue el array introducido por el usuario
	cogerColoresUsuario : function()
	{
		if(master.arrUs != null)
			master.arrUs = master.arrUs.splice(0,master.length);
		master.arrUs = new Array();
		$(".colorUs").each(function() {
			var clases = $(this).attr('class');
		   	master.arrUs.push(clases[clases.length-1]);
		});
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


	pasaTurno : function(teclado)
	{
		config.turnoActual++;
		if(teclado)
			master.cogerColoresUsuario();
		master.cuantasOK();
		master.cuantasKO();
		master.generaArrayPistas();
		masterUI.AnadirInfoTurno(config.turnoActual,master.arrUs);
		masterUI.AnadirPistasTurno(config.turnoActual,master.arrPist);
		utils.alert("------------------------");
		utils.alert("turno:"+config.turnoActual);
		utils.alert("array usuario :"+master.arrUs);
		utils.alert("array original :"+master.arrOr);
		utils.alert("array pistas :"+master.arrPist);
		utils.alert("------------------------");
		$("#contRellenar").empty();
		masterUI.MostrarColoresRellenar();
		$(".colorPicker").click(eventsFunctions.colorPicker);
		$("#rapid").keydown(eventsFunctions.atajoInput);
	},


	compruebaTurnos : function()
	{
		if(config.turnoActual == config.turnos)
		{
			$('#info').modal('show');
			master.reiniciaJuego();
			return false;
		}
		else 
			return true;
	},

	//Controlamos el click en el boyon accion.Empezamos a jugar, o pasamos turno
	accion : function(){

		//seteamos la cookie si aun no hemos empezado a jugar
		if(!config.jugando)
		{
			//ponemos a true el booleano que nos dice si estamos jugando o no.
			config.jugando = !config.jugando;
			config.turnoActual = 0;
			config.turnos = $("#slider").slider("option", "value");
			cookies.setCookie("turnosMax",config.turnos,1);
			$( "#slider" ).slider( "destroy" );
			$( "#slider" ).slider({
				value: (config.turnos-config.turnoActual)-1,
				min: 0,
				max: config.turnos,
				step: 1
		    });
		    masterUI.CambiarTextoBoton();
		}
		$("#turnos").text("Turnos : "+((config.turnos-config.turnoActual)-1));
		$("#slider" ).slider( "value", ((config.turnos-config.turnoActual)-1));
		
		//pasamos turno
		master.pasaTurno(true);
		master.compruebaTurnos();

		//quitamos los colores de los circulos
		$(".colorUs").each(function(){
			utils.cambiarClase("#"+$(this).attr("id"),"class0");
		});
		
	},

	//funcion que reinicia las variables para volver a jugar
	reiniciaJuego : function()
	{
		config.jugando = false;
		config.turnoActual = 0;
		masterUi.BorrarListaPistas();
		masterUI.CambiarTextoBoton();
	}
}