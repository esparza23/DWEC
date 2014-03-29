/* Libreria donde controlaremos todo lo relacionado con la interfaz grafica del programa */

var masterUI =
{
	//Funcion que creara los espacios para que el usuario seleccione los nuevos colores
	MostrarColoresRellenar : function()
	{
		div = $("#contRellenar");
		for(i=1;i<=config.numHuecos;i++)
		{
			div.append
			(
				$(document.createElement("div"))
					.attr("id","contCir"+i)
					.addClass("contColorUs")
					.append
					(
						$(document.createElement("div"))
							.addClass("col")
							.append
							(
								$(document.createElement("div"))
									.attr("id","col"+i)
									.addClass("colorUs classNO")
							)
					)
					.append
					(
						$(document.createElement("div"))
							.attr("id","picker"+i)
							.addClass("picker")
					)
			)
			for(j=1;j<=config.numColores;j++)
			{
				$("#picker"+i).append
				(
					$(document.createElement("div"))
						.attr("id","but"+i+j)
						.addClass("colorPicker")
						.addClass("but"+j)
						.addClass("class"+j)
						.text(j)
				)
			}
		}
		div.append
		(
			$(document.createElement("input"))
				.attr("type","text")
				.attr("placeholder","12345")
				.attr("id","rapid")
				.attr("maxlength","5")
		)
	},

	//Funcion que muestra la lista de pistas en la interfaz
	MostrarPistasEnLista : function(arrayPistas)
	{
		div = $("#contPistas");
		for(i=1;i<=config.numHuecos;i++)
		{
			div.append
			(
				$(document.createElement("div"))
					.attr("id","contCir"+i)
					.addClass("contColors")
					.append
					(
						$(document.createElement("div"))
							.addClass("col")
							.append
							(
								$(document.createElement("div"))
									.attr("id","col"+i)
									.addClass("color")
									.addClass("class"+arrayPistas[i])
							)
					)
			)
		}
	},

	//Funcion que borra la lista de pistas de la interfaz
	BorrarListaPistas : function(){
		$("#otrosTurnos").empty(); 
	},

	//Funcion que obtendra la información que el usuario haya puesto en el textbox de introduccion rapida
	CapturarCajaRapida : function(){},

	//Funcion para añadir la información del turno
	AnadirInfoTurno : function(turno,arrayInfo)
	{
		div = $("#otrosTurnos");
		div.prepend
		(
			$(document.createElement("div"))
				.attr("id","turno"+turno)
				.addClass("turnos")
		)
		div = $("#turno"+turno); 
		div.append
		(	
			$(document.createElement("div"))
				.attr("id","coloresTurno"+turno)
				.addClass("coloresTurno")
		)
		div = $("#coloresTurno"+turno); 
		for(i=0;i<config.numHuecos;i++)
		{
			div.append
			(
				$(document.createElement("div"))
					.attr("id","contCir"+i)
					.addClass("contColors")
					.append
					(
						$(document.createElement("div"))
							.addClass("colInfo")
							.append
							(
								$(document.createElement("div"))
									.attr("id","col"+i)
									.addClass("color debug")
									.addClass("class"+arrayInfo[i].replace('O','0'))
									.text(arrayInfo[i])
							)
					)
			)
		}

		$("#turno"+turno).append
		(	
			$(document.createElement("div"))
				.addClass("numTurno")
				.text(turno)
		)
	},

	//Funcion para añadir la información del turno
	AnadirPistasTurno : function(turno,arrayPistas)
	{
		div = $("#turno"+turno); 
		div.append
		(	
			$(document.createElement("div"))
				.attr("id","pistasTurno"+turno)
				.addClass("pistasTurno")
		)
		div = $("#pistasTurno"+turno); 
		for(i=0;i<config.numHuecos;i++)
		{
			div.append
			(
				$(document.createElement("div"))
					.attr("id","contCir"+i)
					.addClass("contColors")
					.append
					(
						$(document.createElement("div"))
							.addClass("col")
							.append
							(
								$(document.createElement("div"))
									.attr("id","col"+i)
									.addClass("color debug")
									.addClass("class"+arrayPistas[i])
									.text(arrayPistas[i])
							)
					)
			)
		}
	},

	//Funcion que cambia el texto del boton
	CambiarTextoBoton : function()
	{
		var but = $("#accion");
		if(but.text() == "Empezar A jugar")
			but.text("Dame pistas");
		else
			but.text("Empezar A jugar");
	}

}