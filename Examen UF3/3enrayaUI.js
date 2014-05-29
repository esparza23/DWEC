//Libreria donde esta todo lo relacionado con la parte visual del programa

var enrayaUI = 
{
	vaciaTablero : function()	//funcion que vacio el tablero visual
	{
		for(i=0;i<enraya.filas;i++)
		{
			for(j=0;j<enraya.columnas;j++)
				$("#col"+i+j).empty();
		}
	},
	colocaFitxa : function(fila,columna,num)	//funcion que coloca una ficha en el tablero visual
	{
		var fitxa;
		if(num==1)
			fitxa = "fitxa1";
		else 
			fitxa = "fitxa2";
		$("#col"+fila+columna).append
		(			
			$(document.createElement("div"))
				.addClass(fitxa)
				.attr("id","fitxa"+fila+columna)
		);
	},
	cargaPartida : function()		//funcion que carga la partida en el tablero visual
	{
		for(i=0;i<enraya.filas;i++)
		{
			for(j=0;j<enraya.columnas;j++)
			{
				if(enraya.tablero[i][j] != 0)
					enrayaUI.colocaFitxa(i,j,enraya.tablero[i][j]);
			}
		}
	}
}