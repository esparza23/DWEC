/* Libreria donde controlaremos todo lo relacionado con la interfaz grafica del programa */

var masterUI =
{
	//Funcion que creara los espacios para que el usuario seleccione los nuevos colores
	mostrarColoresRellenar : function()
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
				.css("float","left")
				.css("height","52px")
		)
		div.append
		(
			$(document.createElement("div"))
				.attr("id","mensCaja")
				.attr("class","alert alert-danger mensajeCaja hidden")
				.text("hoal")
		)
	},

	//Funcion que muestra la lista de pistas en la interfaz
	mostrarPistasEnLista : function(arrayPistas)
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

	//Funcion que quita los colores escogidos por el usuario para el siguiente turno
	quitarColoresUsuario : function()
	{
		$(".colorUs").each(function(){
			utils.cambiarClase("#"+$(this).attr("id"),"class0");
		});
	},

	//Funcion que borra la lista de pistas de la interfaz
	borrarListaPistas : function(){
		$("#otrosTurnos").empty(); 
	},

	//Funcion que obtendra la información que el usuario haya puesto en el textbox de introduccion rapida
	cogerColoresUsuario : function(){
		if(master.arrUs != null)
			master.arrUs = master.arrUs.splice(0,master.length);
		master.arrUs = new Array();
		$(".colorUs").each(function() {
			var clases = $(this).attr('class');
		   	master.arrUs.push(clases[clases.length-1]);
		});
	},


	//Funcion para añadir la información del turno
	anadirInfoTurno : function(turno,arrayInfo)
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
	anadirPistasTurno : function(turno,arrayPistas)
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
	cambiarTextoBoton : function()
	{
		var but = $("#accion");
		if(but.text() == "Empezar A jugar")
			but.text("Dame pistas");
		else
			but.text("Empezar A jugar");
	},

	//Funcion que enseña el modal con el mensaje adecuado
	muestraModal :function(mensaje,modo){
		$('#info').modal({
			keyboard: false,
			backdrop:'static'
		});
		$('#mensaje').text(mensaje);
		if(modo==1)
		{
			$('#mensaje').removeClass('alert-danger');
			$('#mensaje').addClass('alert-success')
		}
		else
		{
			$('#mensaje').addClass('alert-danger');
			$('#mensaje').removeClass('alert-success')
		}
	},

	//funcion que muestra un mensaje de informacion cuando el usuario introduce mal 
	//valores en la caja rapida
	mensajeErrorCaja : function()
	{
		$("#mensCaja").removeClass('hidden');
		$("#mensCaja").text("Tienen que ser 5 numeros del 0 al 6");
	},

	//funcion que quita el mensaje de error de la caja rapida
	quitarMensajeErrorCaja : function()
	{
		$("#mensCaja").addClass('hidden');
		$("#mensCaja").text("");
	},

	//funcion que inicializa el slider
	inicializaSlider : function()
	{
		//Si el slider esta iniciaizado, lo destruimos(para ahorrarnos problemas)
		if($("#slider").hasClass('ui-slider'))
			$( "#slider" ).slider( "destroy" );

		$( "#slider" ).slider({
			value:10,
			min: 7,
			max: 16,
			step: 1,
			slide: function( event, ui ) {
				$("#turnos").text("Turnos : "+ui.value);
			}
	    });

		//comprobaremos si existe la cookie para los turnos maximos
		cookies.comprobarCookieInicio();
	},

	//funcion que pone un valor al slider
	ponerValorSlider : function(valor)
	{
		utils.alert("Hay cookie "+ valor);
		$("#slider" ).slider( "value", valor );
		$("#turnos").text("Turnos : "+valor);
	},

	//funcion que cambia el slider para que cuente hacia atras los turnos
	cambiarSlider : function()
	{
		$( "#slider" ).slider( "destroy" );
		$( "#slider" ).slider({
			value: (config.turnos-config.turnoActual)-1,
			min: 0,
			max: config.turnos,
			step: 1
	    });
	}

}