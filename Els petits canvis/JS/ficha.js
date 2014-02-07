function Ficha()
{
	var id;
	var color = null;
	var feliz;

	this.crearFicha = function(i,j,numFicha,nColor)
	{	
		color = nColor;
		$("#casella"+i+j).append
		(
			$(document.createElement("div"))
				.attr("id","ficha"+numFicha)
				.addClass(color+" ui-widget-content")
		)

		id = "ficha"+numFicha;
	}

	//funcion que devuelve el color de una ficha.
	this.getColor = function()
	{
		return color;
	}

	//funcion que da el color a una ficha.
	this.setColor = function(nColor)
	{
		color = nColor;
	}

	//FUncion que devuelve si la ficha es.
	this.soyFeliz = function()
	{
		return feliz;
	}

	//Funcion que evalua si una ficha es feliz, y si no lo es, la preparamos para que busque felicidad.
	this.feliz = function(buscaFel,evalFel,a,b)
	{
		$("#"+id).removeClass('unhappy');
		colorDrag = color;
		var inici = numero($("#"+id).parent().attr("id"));
		var x = Math.floor(inici/10);
		var y = inici%10;

		//El booleano click indica 	que estamos jugando al 4 en raya
		if(click)
		{
			//Si la ficha no es feliz, hacemos que "caiga", "buscando felicidad".
			if(!evalFel(x,y))
				buscaFel(id);
			else
			{	
				//si la fihca es feliz al dejarla, miramos si hemos ganado.
				var num = 0;
    			for(d=0;! guanyat && d<dir[0].length;d++)
			    {
			    	if(miraCasilla(x,y,dir[0][d],dir[1][d],num,dir[0][d],dir[1][d]))
				    	mensajeFinal(x,y);
			    }
			}
		}
		//si no, estamos jugando al juego de Schelling
		else
		{
			feliz = evalFel(a,b);
			if(!feliz)
			{
				$("#"+id).addClass('unhappy');
				$("#"+id).css("cursor","move");
				$("#"+id).draggable({
					revert:"invalid",
					start: function() {
						tauler.treuDropp();
						var num = numero($("#"+id).parent().attr("id"));
						xOr = Math.floor(num/10);
						yOr = num%10;
						colorDrag = color;
						buscaFel(a,b);
					}
				});
			}
			else
			{
				if($("#"+id).data('uiDraggable'))
				{
					$("#"+id).draggable('destroy');
					$("#"+id).css("cursor","auto");
				}
			}
		}
		
	}
}