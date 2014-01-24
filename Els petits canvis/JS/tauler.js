function Tauler(filas,columnes,fichesA,fichesB)
{
	this.filas = filas;
	this.columnes = columnes;
	this.fichesA = fichesA;
	this.fichesB = fichesB;

	this.inicializar = function()
	{

	}
	
	this.pintarTauler = function()
	{
		for(i = 0;i < this.filas; i++)
		{
			$("#tauler").append
			(
				$(document.createElement("div"))
					.attr("id","fila"+i)
					.addClass("fila")
			)

			for(j = 0;j < this.columnes; j++)
			{
				$("#fila"+i).append
				(
					$(document.createElement("div"))
						.attr("id","casella"+i+j)
						.addClass("casella")
				)
				/*
				if(i%2==0)
				{
					$("#casella"+i+j).append
					(
						$(document.createElement("div"))
							.addClass("circleA")
					)
				}
				else
				{
					$("#casella"+i+j).append
					(
						$(document.createElement("div"))
							.addClass("circleB")
					)
				}
				*/
				switch(i)
				{
					case 0:
						$("#casella"+i+j).addClass("casA");
						break;
					case (this.filas-1):
						$("#casella"+i+j).addClass("casB");
						break;
				}
				switch(j)
				{
					case 0:
						$("#casella"+i+j).addClass("casL");
						break;
					case (this.columnes-1):
						$("#casella"+i+j).addClass("casD");
						break;
				}
			}
		}	
	}

}