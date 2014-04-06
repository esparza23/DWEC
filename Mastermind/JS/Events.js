/* Libreria donde controlaremos los eventos de nuestro MasterMind */

//Evento que salta cuando el documento esta cargado, para empezar a hacer cosas.
jQuery(document).ready(function($) {	

	utils.alert("empezaremos a jugar");
	
	//colocamos la pagina arriba del todo, por si se hubiera bajado
	masterUI.subirArriba();

	//creamos la interfaz de seleccion de colores
	masterUI.mostrarColoresRellenar();

	//Evento que controla el click en cualquier div con clase colorPicker, que son los que seleccionan el color de la redonda.
	$(".colorPicker").click(eventsFunctions.colorPicker);

	//Evento que controla el click en cualquier div .coolorUs para ponerlo en blanco otra vez
	$(".colorUs").click(eventsFunctions.colorBlanco);

	//Evento que controla el apretar teclas en el textbox
	$("#rapid").keydown(eventsFunctions.atajoInput);

	//controlamos el click en el boton de accion(jugar)
	$("#accion").click(eventsFunctions.accion);

	//generamos el codigo oculto para empezar a jugar
	master.generarCodigoOculto();	

	//accionamos e inicializamos el slider para escoger los turnos
	masterUI.inicializaSlider();

	//controlamos el boton del modal, para reiniciar el juego
	$("#cerrar").click(eventsFunctions.reiniciar);

});