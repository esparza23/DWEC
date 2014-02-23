function Tauler(filesN,columnesN)
{
	//Definimos los atributos, 2 privados y 3 publicos(para acceder a ellos desde cualquier lado).
	var files = filesN;
	var columnes = columnesN;
	this.caselles = null;
	this.files = files;
	this.columnes = columnes;

	//funcion que carga la partida de un archivo JSON
	this.carga = function(partida)
	{
		switch(partida.juego)
		{
			case "juego1":
				feliz = felizIguales;
				busca = iguales;
				click = false;
				juego = "juego1";
				break;
			case "juego2":
				feliz = felizContrario;
				busca = contrario;
				click = false;
				juego = "juego2";
				break;
			case "joc3":
				feliz = feliz4Raya;
				busca = busca4Raya;
				reparteix = false;
				click = true;
				turno = true;
				juego = "juego3";
				break;
		}
		minim = partida.minim;
		
   		for(a=0;a<partida.tauler.files;a++)
   		{
   			for(b=0;b<partida.tauler.columnes;b++)
   			{
   				
   				var cas = new Casella(a,b);
				cas.crearCasella(a,b);
				this.caselles[a][b] = cas;
				
   				if(partida.tauler.caselles[a][b].ficha != null)
   				{
   					console.log(a+"-"+b+"-"+partida.tauler.caselles[a][b].ficha.color);
   					var col = partida.tauler.caselles[a][b].ficha.color;
   					this.caselles[a][b].inicializaFicha(a,b,col);
   				}
   			}
   		}
        console.log(this.tauler);
        this.actualitzaFelicitat();
	}

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
	
	//Funcion que pinta el tableroy crea las filas.
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
		}
	}

	//funcion que coloca las casillas en las filas del tablero
	this.colocaCasillas = function(reparteix)
	{
		for(i = 0;i < files; i++)
		{
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

	//Funcion que determina el numero de fichas infelices que quedan en el tablero.
	this.numInfelices = function()
	{
		infelices = 0;
		for(a = 0;a < files; a++)
		{
			for(b = 0;b < columnes; b++)
			{
				if(this.caselles[a][b].tincFicha() && !this.caselles[a][b].fichaFeliz())
				{
					infelices++;
				}
			}
		}
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
		this.numInfelices();
		if(infelices==0)
			mensajeFinal();
		else
		{
			var partida = JSON.stringify(tauler);
			partida = '{"juego":"'+juego+'","minim":"'+minim+'","tauler":'+partida;
			partida+="}";
			var data = "text/json;charset=utf-8," + encodeURIComponent(partida);
			$("#partida").attr("href",'data:' + data ).attr("download","data.json");
		}
	}
}