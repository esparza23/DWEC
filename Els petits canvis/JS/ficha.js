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

	this.feliz = function(buscaFel,evalFel)
	{
		$("#"+id).removeClass('unhappy');
		colorDrag = color;
		feliz = evalFel();
		if(!feliz)
		{
			$("#"+id).addClass('unhappy');
			$("#"+id).draggable({
				revert:"invalid",
				start: function() {
					tauler.treuDropp();
					var num = numero($("#"+id).parent().attr("id"));
					xOr = Math.floor(num/10);
					yOr = num%10;
					colorDrag = color;
					buscaFel();
				}
			});
		}
		else
		{
			if($("#"+id).data('uiDraggable'))
				$("#"+id).draggable('destroy');
		}
	}
}