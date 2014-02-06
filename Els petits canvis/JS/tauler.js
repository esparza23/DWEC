function Tauler(filesN,columnesN)
{
	//Definimos los atributos, 2 privados y 3 publicos(para acceder a ellos desde cualquier lado).
	var files = filesN;
	var columnes = columnesN;
	this.caselles = null;
	this.files = files;
	this.columnes = columnes;

	//Funcion que coloca las fichas en el tablero.
	this.colocaFiches = function()
	{
		var x,y;
		for(f = 0;f<ficVerdes;f++)
		{
			do
			{
				x = Math.floor((Math.random()*10)+0);
				y = Math.floor((Math.random()*10)+0);
			}while(tauler.caselles[x][y].tincFicha());
			tauler.caselles[x][y].inicializaFicha(x,y,"circleA");
		}
		for(f = 0;f<ficBlaves;f++)
		{
			do
			{
				x = Math.floor((Math.random()*10)+0);
				y = Math.floor((Math.random()*10)+0);
			}while(tauler.caselles[x][y].tincFicha());
			tauler.caselles[x][y].inicializaFicha(x,y,"circleB");
		}
	}
	
	//Funcion que pinta el tablero, crea el objeto y crea las casillas para guardarlas en la matriz.
	this.pintarTauler = function(reparteix)
	{
		this.caselles = null;
		this.caselles = new Array(new Array(files));
		for(i = 0;i < files; i++)
		{
			this.caselles[i] = new Array(new Array(columnes));
			$("#tauler").append
			(
				$(document.createElement("div"))
					.attr("id","fila"+i)
					.addClass("fila")
			)

			for(j = 0;j < columnes; j++)
			{
				//Llamamos al constructor de casilla para crear cada casilla.
				var cas = new Casella(i,j);
				cas.crearCasella(i,j);
				this.caselles[i][j] = cas;
			}
		}
		console.log(this.caselles);
		if(reparteix)
		{	
			this.colocaFiches();
			this.actualitzaFelicitat();
		}
	}

	//Funcion que recorre todas las casillas del tablero, y si son droppables, les quita la caracteristica.
	this.treuDropp = function()
	{
		for(i = 0;i < files; i++)
		{
			for(j = 0;j < columnes; j++)
			{
				if(this.caselles[i][j].socDropp())
					this.caselles[i][j].treuDropp();
			}
		}
	}

	//Funcion que dadas unas coordenadas, quita la ficha de esa casilla.
	this.treuFicha = function (i,j)
	{
		var f = this.caselles[i][j].tornaFicha();
		this.caselles[i][j].treuFicha();
		return f;
	}

	//Funcion que dadas unas coordenadas, pone una ficha en esa casilla.
	this.colocaFicha = function (i,j,ficha)
	{
		this.caselles[i][j].posarFicha(ficha);
	}

	//funcion que recorre el tablero, evaluando la felicidad de cada ficha(Si hay)
	this.actualitzaFelicitat = function()
	{
		for(a = 0;a < files; a++)
		{
			for(b = 0;b < columnes; b++)
			{
				if(this.caselles[a][b].tincFicha())
				{
					this.caselles[a][b].evalFelicitat(a,b);
				}
			}
		}
		if(infelices==0)
	    {
	    	$("#mensajeFinal").removeClass('hidden');
	    	setTimeout(function(){
	    		$("#mensajeFinal").addClass('hidden');
	    	},5000);
	    	$("#mens").text("Enhorabuena, todos los ciudadanos son felices!");
	    }
	}
}