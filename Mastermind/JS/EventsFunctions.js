/* Libreria donde definiremos las funciones para los eventos */

var eventsFunctions = 
{
	//Funcion de prueba
	colorPicker: function(event)
	{
		var nums = utils.numero(event.target.id);
		var numCol = Math.floor(nums/10);
		var numCss = nums%10;
		utils.cambiarClase("#col"+numCol,"class"+numCss);
	},

	//Funcion que pone en blanco la redonda clickada por el usuario
	colorBlanco: function(event)
	{
		var nums = utils.numero(event.target.id);
		utils.cambiarClase("#col"+nums,"class0");
	},

	//funcion que pasa los turnos por el atajo de teclado
	atajoInput: function(event)
	{
		if(event.keyCode==13)
		{
			masterUI.quitarMensajeErrorCaja();
			master.comprobarCajaRapida();
		}
	},

	//Controlamos el click en el boyon accion.Empezamos a jugar, o pasamos turno
	accion : function(){
		config.teclado = false;
		master. prepararTurno();
	},

	//funcion que reinicia el juego
	reiniciar : function()
	{
		master.reiniciaJuego();
	}
}