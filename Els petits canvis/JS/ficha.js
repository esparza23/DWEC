function Ficha()
{
	var id;
	var color;

	this.crearFicha = function(i,j,numFicha)
	{
		$("#casella"+i+j).append
		(
			$(document.createElement("div"))
				.attr("id","ficha"+numFicha)
				.addClass("circleA ui-widget-content")
		)

		$("#ficha"+numFicha).draggable({
			revert:"invalid",
			start: function() {
				//posar les casillas on puc anar...callback?
				tauler.buscaLloc();
			}
		});
	}
}