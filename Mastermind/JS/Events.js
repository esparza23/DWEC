/* Libreria donde controlaremos los eventos de nuestro MasterMind */

//Evento que salta cuando el documento esta cargado, para empezar a hacer cosas.
jQuery(document).ready(function($) {	

	utils.alert("empezaremos a jugar");

	//creamos la interfaz de seleccion de colores
	masterUI.MostrarColoresRellenar();

	//Evento que controla el click en cualquier div con clase colorPicker, que son los que seleccionan el color de la redonda.
	$(".colorPicker").click(eventsFunctions.colorPicker);

	//Evento que controla el apretar teclas en el textbox
	$("#rapid").keydown(eventsFunctions.atajoInput);

	//generamos el codigo oculto para empezar a jugar
	master.generarCodigoOculto();	

	//controlamos el click en el boton de accion(jugar)
	$("#accion").click(master.accion);

	//accionamos e inicializamos el slider para escoger los turnos
	$( "#slider" ).slider({
		value:10,
		min: 7,
		max: 16,
		step: 1,
		slide: function( event, ui ) {
			$("#turnos").text("Turnos : "+ui.value);
		}
    });

	//comprobaremos si existe la cookie para los turnos maximos
	cookies.comprobarCookieInicio();
});