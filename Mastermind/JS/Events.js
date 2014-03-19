/* Libreria donde controlaremos los eventos de nuestro MasterMind */

//Evento que salta cuando el documento esta cargado, para empezar a hacer cosas.
jQuery(document).ready(function($) {

	//Par de pruebas para comprobar el funcionamiento de los namespaces
	utils.alert("hola");
	$("button").click(eventsFunctions.primera);
});