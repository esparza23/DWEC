function Casella(i,j)
{
	//Definimos los atributos de casilla, todos privados
	var id = "casella"+i+j;
	var i = i;
	var j = j;
	var ficha = null;

	//Funcion que crea el HTML necesario para crear un casilla.
	this.crearCasella = function(i,j)
	{
		$("#fila"+i).append
		(
			$(document.createElement("div"))
				.attr("id","casella"+i+j)
				.addClass("casella ui-widget-header")
		)

		//SI estamos jugando al 4 en raya, añadimos los eventos click y hover a las casillas.
		if(click)
		{
			var cas = $("#casella"+i+j);
			cas.click(function(event) {
				if(!tauler.caselles[i][j].tincFicha())
				{
					if(turno)
						colorN = "circleA";
					else 
						colorN = "circleB"
					turno = !turno;
					ficha = new Ficha();
					ficha.crearFicha(i,j,numFicha,colorN);
					ficha.feliz(busca,feliz);
					numFicha++;
				}
				else alert("NOOOO");
			});
			cas.hover(function() {
				cas.css("background-color","#FFD071");
				cas.css("cursor","pointer");
			}, function() {
				cas.css("background-color","#FFEDC5");
				cas.css("cursor","auto");
			});
		}	
	}

	//Funcion que devuelve sun booleano indicando si tiene una ficha dentro.
	this.tincFicha = function()
	{
		if(ficha == null)
			return false;
		else 
			return true;
	}

	//Funcion que llamaa al constructor de Ficha para añadirla a la casilla.
	this.inicializaFicha = function(x,y,color)
	{
		ficha = new Ficha();
		ficha.crearFicha(x,y,numFicha,color);
		numFicha++;
	}

	//Funcion que pone una ficha en el atributo ficha de la casilla
	this.posarFicha = function(fichaNew)
	{
		ficha = fichaNew;
	}

	//Funcion que quita la ficha del atributo ficha de la casilla
	this.treuFicha = function()
	{
		ficha = null;
	}

	//Funcion que devuelve la ficha de la casilla
	this.tornaFicha = function()
	{
		return ficha;
	}

	this.fichaFeliz = function()
	{
		return ficha.soyFeliz();
	}

	//Funcion que devuelve el color de la ficha de la casilla
	this.tornaColorFicha = function()
	{
		return ficha.getColor();
	}

	//Funcion que quita la propiedad de la casilla de coger fichas.
	this.treuDropp = function()
	{
		$("#casella"+i+j).droppable('destroy');
	}

	//Funcion que devuelve si la casilla acepta fichas o no.
	this.socDropp = function()
	{
		if ($("#casella"+i+j).data('uiDroppable')) 
			return true;
		else 
			return false;
	}

	//Funcion que evalua la felicidad de la ficha que tiene la casilla.
	this.evalFelicitat = function(a,b)
	{
		ficha.feliz(busca,feliz,a,b);
	}

	//Funcion que hace que una casilla este receptible para coger una ficha
	this.posarseDisp = function()
	{
		$("#casella"+i+j).droppable({
			activeClass: "posible",
			hoverClass: "posibleActiu",
	    	drop: function( event, ui ) {
	    		
	    		//Borramos la ficha de donde estaba.
	        	var inici = numero(ui.draggable.parent().attr("id"));
	        	var f = tauler.treuFicha(Math.floor(inici/10),inici%10);
	        	ui.draggable.remove();
	        	
	        	//Creamos la ficha en el destino, y actualizamos la felicidad.
	        	var desti = numero(event.target.id);
	        	f.crearFicha(Math.floor(desti/10),desti%10,ui.draggable.attr("id"),f.getColor());
	        	tauler.colocaFicha(Math.floor(desti/10),desti%10,f);
	        	tauler.actualitzaFelicitat();
	       
	      	}
	    });
	}
}