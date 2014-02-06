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

	this.getColor = function()
	{
		return color;
	}

	this.setColor = function(nColor)
	{
		color = nColor;
	}

	this.soyFeliz = function()
	{
		return feliz;
	}

	this.feliz = function(buscaFel,evalFel,a,b)
	{
		$("#"+id).removeClass('unhappy');
		colorDrag = color;
		var inici = numero($("#"+id).parent().attr("id"));
		var x = Math.floor(inici/10);
		var y = inici%10;
		if(click)
		{
			if(!evalFel(x,y))
				buscaFel(id);
			else
			{	
    			for(d=0;! guanyat && d<dir[0].length;d++)
			    {
			    	if(miraCasilla(a,y,dir[0][d],dir[1][d],num,dir[0][d],dir[1][d]))
				    {
				    	guanyat = true;
				    	//alert("WIIIIN");
				    	$("#mensajeFinal").removeClass('hidden');
				    	setTimeout(function(){
				    		$("#mensajeFinal").addClass('hidden');
				    	},5000);
				    	var col;
				    	if(tauler.caselles[a][y].tornaColorFicha()=="circleA")
				    		col = "verd";
				    	else 
				    		col = "blau";
				    	$("#mens").text("Ha guanyat l'equip "+col);
				    }
			    }
			}
		}
		else
		{
			var fe = feliz;
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
				if(!fe)
					infelices--;
				if($("#"+id).data('uiDraggable'))
				{
					$("#"+id).draggable('destroy');
					$("#"+id).css("cursor","auto");
				}
			}
		}
		
	}
}