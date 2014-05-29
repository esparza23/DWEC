//Libreria donde estan las funciones para los eventos del programa

var functionEvents = 
{
	clickReiniciar : function()		//funcion que controla el click en el boton reiniciar
	{
		utils.alert("reinicio");

		enraya.vaciaTablero();

		utils.alert(enraya.tablero);
	},
	clickTablero : function(event)		//funcion que controla el click en el tablero visual
	{
		//utils.alert("clicko en "+event.target.id);
		//utils.alert(enraya.tablero);

		var cas = event.target.id;
		var fila = cas[cas.length-2];
		var columna = cas[cas.length-1];
		enraya.colocaFitxa(fila, columna);
	},
	recuperaPartida : function()		//funcion que recupera la partida de la cookie al empezar
	{
		var partida = cookies.getCookie("partida");
		utils.alert("Partida : "+partida);
		enraya.cargaPartida(partida);
	}
}