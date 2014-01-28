function Casella(i,j)
{
	var id = "casella"+i+j;
	var i = i;
	var j = j;
	var ficha = null;

	this.crearCasella = function(i,j,files,columnes)
	{
		$("#fila"+i).append
		(
			$(document.createElement("div"))
				.attr("id","casella"+i+j)
				.addClass("casella ui-widget-header")
		)
		switch(i)
		{
			case 0:
				$("#casella"+i+j).addClass("casA");
				break;
			case (files-1):
				$("#casella"+i+j).addClass("casB");
				break;
		}
		switch(j)
		{
			case 0:
				$("#casella"+i+j).addClass("casL");
				break;
			case (columnes-1):
				$("#casella"+i+j).addClass("casD");
				break;
		}
		//x = $("#casella"+i+j).offset().left;
		//y = $("#casella"+i+j).offset().top;
		if(i>1)
		{
			ficha = new Ficha();
			ficha.crearFicha(i,j,numFicha);
			numFicha++;
		}
	}

	//Retorna cert si la casella te una ficha dintre
	this.tincFicha = function()
	{
		if(ficha == null)
			return false;
		else 
			return true;
	}

	this.posarFicha = function(fichaNew)
	{
		ficha = fichaNew;
	}

	this.treuFicha = function()
	{
		ficha = null;
	}

	this.tornaFicha = function()
	{
		return ficha;
	}

	//Treu la propietat de la casella d'acceptar fiches
	this.treuDropp = function()
	{
		$("#casella"+i+j).droppable('destroy');
	}

	//Retorna cert si la casella accepta la fihca en un moment
	this.socDropp = function()
	{
		if ($("#casella"+i+j).data('uiDroppable')) 
			return true;
		else 
			return false;
	}

	this.posarseDisp = function()
	{
		//Aquesta funcio s'haura de posar quan recorrem l'array
		$("#casella"+i+j).droppable({
			activeClass: "posible",
			hoverClass: "posibleActiu",
	    	drop: function( event, ui ) {
	    		
	    		//Borrem la ficha de l'anterior casella.
	        	var inici = numero(ui.draggable.parent().attr("id"));
	        	//alert(inici[0]);
	        	var f = tauler.treuFicha(Math.floor(inici/10),inici%10);
	        	
	        	ui.draggable.remove();
	        	
	        	var desti = numero(event.target.id);
	        	tauler.colocaFicha(Math.floor(desti/10),desti%10,f);
				
	        	//alert(numero(event.target.id)+"-"+numero(ui.draggable.attr("id")));

	        	//Movem la ficha a la casella on l'hem deixada
	        	
	        	$("#"+event.target.id).append
	        	(
	        		$(document.createElement("div"))
	        			.attr("id",ui.draggable.attr("id"))
	        			.addClass(ui.draggable.attr("class"))
	        			.draggable({
							revert:"invalid",
							start: function() {
								//posar les casillas on puc anar...callback?
								tauler.buscaLloc();
							}
						})
	        	)
	        	tauler.treuDropp();
	       
	      	}
	    });
	}
}