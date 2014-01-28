function Tauler(filesN,columnesN,fichesA,fichesB)
{
	var files = filesN;
	var columnes = columnesN;
	var fichesA = fichesA;
	var fichesB = fichesB;
	var caselles;

	this.inicializar = function()
	{

	}
	
	this.pintarTauler = function()
	{
		caselles = new Array(new Array(files));
		for(i = 0;i < files; i++)
		{
			caselles[i] = new Array(new Array(columnes));
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
				caselles[i][j] = cas;
			}
		}
		console.log(caselles);
	}

	this.treuDropp = function()
	{
		for(i = 0;i < files; i++)
		{
			for(j = 0;j < columnes; j++)
			{
				if(caselles[i][j].socDropp())
					caselles[i][j].treuDropp();
			}
		}
	}

	this.treuFicha = function (i,j)
	{
		var f = caselles[i][j].tornaFicha();
		caselles[i][j].treuFicha();
		return f;
	}

	this.colocaFicha = function (i,j,ficha)
	{
		caselles[i][j].posarFicha(ficha);
	}

	this.buscaLloc = function()
	{
		for(i = 0;i < files; i++)
		{
			for(j = 0;j < columnes; j++)
			{
				if(!caselles[i][j].tincFicha())
					caselles[i][j].posarseDisp();
			}
		}
	}
}