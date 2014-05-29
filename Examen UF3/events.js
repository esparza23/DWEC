//Libreria donde recogemos los eventos del programa

jQuery(document).ready(function($) {

	functionEvents.recuperaPartida();

	$("#reiniciar").click(functionEvents.clickReiniciar);
	$(".col").click(functionEvents.clickTablero);
});