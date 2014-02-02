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
	}

	//Retorna cert si la casella te una ficha dintre
	this.tincFicha = function()
	{
		if(ficha == null)
			return false;
		else 
			return true;
	}

	this.inicializaFicha = function(x,y,color)
	{
		ficha = new Ficha();
		ficha.crearFicha(x,y,numFicha,color);
		numFicha++;
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

	this.tornaColorFicha = function()
	{
		return ficha.getColor();
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

	this.evalFelicitat = function()
	{
		ficha.feliz(busca,feliz);
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
	        	f.crearFicha(Math.floor(desti/10),desti%10,ui.draggable.attr("id"),f.getColor());
	        	
	        	tauler.colocaFicha(Math.floor(desti/10),desti%10,f);
	        	tauler.actualitzaFelicitat();
	       
	      	}
	    });
	}
}