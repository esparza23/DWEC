//Libreria donde esta todo lo relacionado con la logica interna del programa

var enraya = 
{
	filas : 3,
	columnas : 3,
	tablero : [[0,0,0],[0,0,0],[0,0,0]],
	turno : 1,

	vaciaTablero : function()	//funcion que vacia el tablero interno
	{
		for(i=0;i<enraya.filas;i++)
		{
			for(j=0;j<enraya.columnas;j++)
				enraya.tablero[i][j] = 0;
		}
		enrayaUI.vaciaTablero();
		enraya.turno = 1;
		enraya.guardarPartida();
	},
	colocaFitxa : function(fila,columna)		//funcion que coloca una ficha en el tablero interno
	{
		if( enraya.tablero[fila][columna] == 0)
		{
			enraya.tablero[fila][columna] = enraya.turno;
			enrayaUI.colocaFitxa(fila,columna,enraya.turno);

			if(enraya.turno == 1)
				enraya.turno = 2;
			else 
				enraya.turno = 1;

			$("#turno").text("Turno: "+enraya.turno);

			enraya.guardarPartida();
			enraya.comprobarVictoria(fila,columna);
		}
		else
			utils.mensaje("No puedes colocar una ficha ahí ","alert alert-danger");
	},
	guardarPartida : function()			//funcion que guarda la partida en la cookie
	{
		var juego =
		{
			partida : enraya.tablero,
			turno : enraya.turno
		};
		var partida = JSON.stringify(juego);
		utils.alert(partida);
		cookies.setCookie("partida",partida,4);
	},
	cargaPartida : function(partida)	//funcion que carga la partida en el tablero interno
	{
		partida = JSON.parse(partida);
		utils.alert(partida.partida + " - "+partida.turno);
		enraya.tablero = partida.partida;
		enraya.turno = partida.turno;
		$("#turno").text("Turno: "+enraya.turno);
		enrayaUI.cargaPartida();
	},
	comprobarVictoria : function(fila,columna)		//funcion que comprueba si se gana
	{
		//utils.mensaje("bravo ganaste","alert alert-success")
	}
}