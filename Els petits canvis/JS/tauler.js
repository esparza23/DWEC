function Tauler(filesN,columnesN,fichesA,fichesB)
{
	var files = filesN;
	var columnes = columnesN;
	var fichesA = fichesA;
	var fichesB = fichesB;
	this.caselles = null;
	this.files = files;
	this.columnes = columnes;

	this.inicializar = function()
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
	
	this.pintarTauler = function()
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
				var cas = new Casella(i,j);
				cas.crearCasella(i,j,files,columnes);
				this.caselles[i][j] = cas;
			}
		}
		console.log(this.caselles);
		this.inicializar();
		this.actualitzaFelicitat();
	}

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

	this.treuFicha = function (i,j)
	{
		var f = this.caselles[i][j].tornaFicha();
		this.caselles[i][j].treuFicha();
		return f;
	}

	this.colocaFicha = function (i,j,ficha)
	{
		this.caselles[i][j].posarFicha(ficha);
	}

	this.actualitzaFelicitat = function()
	{
		for(i = 0;i < files; i++)
		{
			for(j = 0;j < columnes; j++)
			{
				if(this.caselles[i][j].tincFicha())
					this.caselles[i][j].evalFelicitat();
			}
		}
	}
}