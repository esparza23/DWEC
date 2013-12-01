//Gestionamos los clicks de los botones

function gestionaClicks()
{	

	//funcion del boton nueva partida, que muestra la configuracion
	$("#butNueva").click(function(event) {
		$("#portada").addClass("hidden");
		$("#configuration").removeClass("hidden");
	});

	//funcion del boton salir, que vuelve a la pagina de portada
	$("#butSalir").click(function(event) {
		$("#portada").removeClass("hidden");
		$("#joc").addClass("hidden");
		$("#controls").addClass("hidden");
		reiniciaVariables();
	});

	//funcion del boton pasar turno que llama a la funcion que gestiona el movimiento de los corredores.
	$("#butTurno").click(function(event) {
		$(this).addClass('disabled');
		$(this).text("Simulando...");
		pasarTurno();
		setTimeout(function(){
			$("#butTurno").removeClass('disabled');
			$("#butTurno").text("Pasar Turno");
		},700);
	});

	//Botones guardar y cargar, donde llamamos a la funcion de BD que nos la pone en pantalla.
	$("#butGuardar").click(function(event) {
		cogePartidas("#partidasG");
	});
	$("#butCargar").click(function(event) {
		cogePartidas("#partidasC");
	});

	//botones del modal guardar, si el TextBox esta vacio no se guarda y se muestra un mensaje al usuario
	$("#guardarConf").click(function(event) {
		if($("#tbGuardar").val().trim() =="")
		{
			$("#selecPartidaG").removeClass("hidden");
			return false;
		}
		else
		{
			$("#selecPartidaG").addClass("hidden");
			actualizaWidth();
			guardar($("#tbGuardar").val().trim(),estadoPartida);
			$("#tbGuardar").val("");
		}
	});

	//si cancelamos el guardar, limpiamos el TextBox
	$("#guardarCanc").click(function(event) {
		$("#tbGuardar").val("");
	});

	//botones del modal cargar, si el TextBox esta vacio no se carga si no, sigue el curso normal y llamamos a la funcion cargar.
	$("#cargarConf").click(function(event) {
		if($("#tbCargar").val()=="")
		{
			$("#selecPartidaC").removeClass("hidden");
			return false;
		}
		else
		{
			$("#tbCargar").val("");
			$("#portada").addClass("hidden");
			$("#joc").removeClass("hidden");
			$("#controls").removeClass("hidden");
			carga();
		}
	});

	//funcion que al cancelar el guardar limpia el TB y el mensaje al usuario(si hay)
	$("#cargarCanc").click(function(event) {
		$("#tbCargar").val("");
		$("#selecPartidaC").addClass("hidden");
	});

	//funcion que gestiona el SI del mensaje de alerta de borrar partida
	$(".butSi").click(function(event) {
		var divId = $(this).parent().parent().parent().parent().parent().attr("id");
		if(divId == "cargar")
			borra("#partidasC");
		else
			borra("#partidasG");
		$(".okBorrar").addClass('hidden');
		$(".butGC").removeClass('disabled');
	});

	//funcion que gestiona el NO del mensaje de alerta de borrar partida, ocultandolo
	$(".butNo").click(function(event) {
		$(".okBorrar").addClass('hidden');
		$(".butGC").removeClass('disabled');
	});


	$(".butGC").click(function(event) {
		$(".okBorrar").addClass('hidden');
	});

	//funcion que añade al modal de configuracion e equipo los datos necesarios (que son muchos)
	$(".ajusteEquipos").click(function(event) {
		//Hay que saber el equipo
		var id = $(this).attr("id")
		var eq = id[id.length-1];

		//vaciamos el contenido anterios (si hay)
		$("#corredoresMet").empty();
		$("#botonesConfDer").empty();
		$("#botonesConfIz").empty();
		$("#bolsaCor").empty();
		$("#mensajeConfDan").addClass("hidden");
		$("#mensajeConfSuc").addClass("hidden");

		//añadimos los puntos de la bolsa de alimentos de cada equipo
		$("#numPuntEqEn").text(estadoPartida[eq][2]);
		$("#numPuntEqAg").text(estadoPartida[eq][3]);
		$("#numPuntEqGras").text(estadoPartida[eq][4]);

		//añadimos la gestion de puntos y esfuerzos del equipo seleccionado
		$(document.createElement("span"))
			.text("Total Equipo: "+puntEquipos)
			.addClass("pull-right")
			.appendTo("#corredoresMet");
		$(document.createElement("br"))
			.appendTo("#corredoresMet");
		$(document.createElement("br"))
			.appendTo("#corredoresMet");

		//cremos el contenido izquierdo para los metros maximos y el contenido derecho para el esfuerzo
		$(document.createElement("div"))
			.addClass("row")
			.append
			(
				$(document.createElement("div"))
					.attr("id","corredoresMetIz")
					.addClass("col-md-6")
			)
			.append
			(
				$(document.createElement("div"))
					.attr("id","corredoresMetDer")
					.addClass("col-md-6")
			)
			.appendTo("#corredoresMet");


		//para cada jugador...
		for(i=0;i<estadoPartida[eq][1].length;i++){

			//colocamos el nombre del ciclista, su rol y un input con los metros maximos actuales del ciclista.
			$(document.createElement("span"))
				.text("Corredor: "+estadoPartida[eq][1][i][0]+", Rol: "+estadoPartida[eq][1][i][1])
				.addClass("infoCor center-block")
				.appendTo("#corredoresMetIz");
			$(document.createElement("input"))
				.addClass("puntCorr center-block")
				.attr("value",estadoPartida[eq][1][i][7].toString())
				.appendTo("#corredoresMetIz");
			$(document.createElement("br"))
				.appendTo("#corredoresMetIz");

			//colocamos los slider del esfuerzo del ciclista
			$(document.createElement("span"))	
				.text("Esfuerzo")
				.addClass("textSlider center-block")
				.appendTo("#corredoresMetDer");
			$(document.createElement("div"))
				.attr("id","slider"+eq+i)
				.addClass("mySlider pull-left")
				.appendTo("#corredoresMetDer");
			$(document.createElement("div"))
				.attr("id","sliderVal"+eq+i)
				.addClass('pull-right')
				.text(estadoPartida[eq][1][i][2])
				.appendTo("#corredoresMetDer");
			$(document.createElement("br"))
				.appendTo("#corredoresMetDer");

			//Activamos los sliders y les adjuntamos las funciones para que mantenga actualizado el array estadoPartida
			$("#slider"+eq+i).slider({
		      value:estadoPartida[eq][1][i][2],
		      min: 0,
		      max: 100,
		      step: 5,
		      range:"min",
		      slide: function( event, ui ) {
		      	var idN = $(this).attr("id")
		      	var k = idN[idN.length-2];
		      	var l = idN[idN.length-1];
		        $("#sliderVal"+k+l).text(ui.value);
		      },
		      stop: function( event, ui ) {
		      	var idN = $(this).attr("id")
		      	var k = idN[idN.length-2];
		      	var l = idN[idN.length-1];
		      	estadoPartida[k][1][l][2]= ui.value;
		        $("#sliderVal"+eq+i).text(estadoPartida[k][1][l][2]);
		      }
		    });

			//añadimos el nombre del corredor y sus depositos de energia/agua/grasa y un boton para poder augmentarlo
			$(document.createElement("div"))
				.addClass("row")
				.append
				(
					$(document.createElement("div"))
						.addClass("col-md-3")
						.append
						(
							$(document.createElement("span"))
								.text(estadoPartida[eq][1][i][0])
								.addClass("bolsaCor")
						)
				)
				.append
				(
					$(document.createElement("div"))
						.addClass("col-md-3")
						.append
						(
							$(document.createElement("span"))
								.text(estadoPartida[eq][1][i][4])
								.attr("id","en"+eq+i)
								.addClass("bolsaCor")
						)
						.append
						(
							$(document.createElement("span"))
								.addClass("glyphicon glyphicon-plus addBolsa addEnergia")
								.attr("id","addEn"+eq+i)
								.click(function(event) {
									var idN = $(this).attr("id");
							      	var k = idN[idN.length-2];
							      	var l = idN[idN.length-1];
							      	if(estadoPartida[k][2]>=10 && estadoPartida[k][1][l][4]<=90)
							      	{
							      		estadoPartida[k][1][l][4]+=10;
							      		$("#en"+k+l).text(estadoPartida[k][1][l][4]);
							      		estadoPartida[k][2]-=10;
							      		$("#numPuntEqEn").text(estadoPartida[k][2]);
							      	}
								})
						)
				)
				.append
				(
					$(document.createElement("div"))
						.addClass("col-md-3")
						.append
						(
							$(document.createElement("span"))
								.text(estadoPartida[eq][1][i][5])
								.attr("id","ag"+eq+i)
								.addClass("bolsaCor")
						)
						.append
						(
							$(document.createElement("span"))
								.addClass("glyphicon glyphicon-plus addBolsa addAgua")
								.attr("id","addAg"+eq+i)
								.click(function(event) {
									var idN = $(this).attr("id");
							      	var k = idN[idN.length-2];
							      	var l = idN[idN.length-1];
							      	if(estadoPartida[k][3]>=10 && estadoPartida[k][1][l][5]<=90)
							      	{
							      		estadoPartida[k][1][l][5]+=10;
							      		$("#ag"+k+l).text(estadoPartida[k][1][l][5]);
							      		estadoPartida[k][3]-=10;
							      		$("#numPuntEqAg").text(estadoPartida[k][3]);
							      	}
								})
						)
				)
				.append
				(
					$(document.createElement("div"))
						.addClass("col-md-3")
						.append
						(
							$(document.createElement("span"))
								.text(estadoPartida[eq][1][i][6])
								.attr("id","gr"+eq+i)
								.addClass("bolsaCor")
						)
						.append
						(
							$(document.createElement("span"))
								.addClass("glyphicon glyphicon-plus addBolsa addGrasa")
								.attr("id","addGr"+eq+i)
								.click(function(event) {
									var idN = $(this).attr("id");
							      	var k = idN[idN.length-2];
							      	var l = idN[idN.length-1];
							      	if(estadoPartida[k][4]>=10 && estadoPartida[k][1][l][6]<=90)
							      	{
							      		estadoPartida[k][1][l][6]+=10;
							      		$("#gr"+k+l).text(estadoPartida[k][1][l][6]);
							      		estadoPartida[k][4]-=10;
							      		$("#numPuntEqGras").text(estadoPartida[k][4]);
							      	}
								})
						)
				)
				.appendTo("#bolsaCor");

			$(".addAgua").tooltip({
				placement:"right",
				title:"+10 Agua"
			});
			$(".addEnergia").tooltip({
				placement:"right",
				title:"+10 Energia"
			});
			$(".addGrasa").tooltip({
				placement:"right",
				title:"+10 Grasa"
			});
		}

		//añadimos los botones para confirmar o cancelar cambios
		$(document.createElement("button"))
			.text("Confirmar Cambios")
			.addClass("btn btn-success center-block")
			.click(function(event) {
				var PTotales = 0;
				$(".puntCorr").each(function() {
					PTotales+=parseInt($(this).val());
				});
				alert(PTotales);
				if(PTotales>puntEquipos)
				{
					$("#mensajeConfSuc").addClass("hidden");					
					$("#mensajeConfDan").removeClass("hidden");
					$("#mensajeConfDan").text("Has superado el limite de metros por equipos");
				}
				else if(PTotales<puntEquipos)
				{
					$("#mensajeConfSuc").addClass("hidden");
					$("#mensajeConfDan").removeClass("hidden");
					$("#mensajeConfDan").text("Te has dejado metros por repartir entre los ciclistas");
				}
				else
				{
					var k=0;
					$(".puntCorr").each(function() {
						estadoPartida[eq][1][k][7] = parseInt($(this).val());
						k++;
					});
					$("#mensajeConfDan").addClass("hidden");
					$("#mensajeConfSuc").removeClass("hidden");
					$("#mensajeConfSuc").text("Cambios realizados");
				}
			})
			.appendTo("#botonesConfIz");
		$(document.createElement("button"))
			.text("Cancelar Cambios")
			.attr("data-dismiss","modal")
			.addClass("btn btn-danger center-block")
			.appendTo("#botonesConfDer");
	});


	$('.maillots').click(function(event) {
		$("#"+eqUs).removeClass("active");
		$("#"+eqUs).removeClass("btn-success");
		eqUs = $(this).attr("id");
		//alert(eqUs);
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$("#mensajeStep1").css('visibility','hidden');
	});

	$('.maillotsRiv').click(function(event) {
		$("#"+eqRiv).removeClass("active");
		$("#"+eqRiv).removeClass("btn-danger");
		eqRiv = $(this).attr("id");
		//alert(eqRiv);
		$(this).addClass("active");
		$(this).addClass("btn-danger");
		$("#mensajeStep2").css('visibility','hidden');
	});

	$(".btnNext").click(function(event) {
		switch(currentIndex)
		{
			case 1:
				if(eqUs == null)
					$("#mensajeStep1").css('visibility','visible');
				else
				{
					$("#confCarousel").carousel('next');
					$("#"+eqUs.replace("Us","Riv")).addClass("disabled");
				}
				break;
			case 2:
				if(eqRiv == null)
					$("#mensajeStep2").css('visibility','visible');
				else
					$("#confCarousel").carousel('next');
				break;
		}
	});	

	$(".btnPrev").click(function(event) {
		switch(currentIndex)
		{
			case 1:
				$("#configuration").addClass("hidden");
				$("#portada").removeClass("hidden");
				$("#"+eqUs).removeClass("active");
				$("#"+eqUs).removeClass("btn-success");
				eqUs = null;
				break;
			case 2:
				$("#"+eqUs.replace("Us","Riv")).removeClass("disabled");
				$("#"+eqRiv).removeClass("active");
				$("#"+eqRiv).removeClass("btn-danger");
				eqRiv = null;
				break;
		}
		$("#confCarousel").carousel('prev');
	});	

	$("#empezar").click(function(event) {
		$("#"+eqUs.replace("Us","Riv")).removeClass("disabled");
		$("#configuration").addClass("hidden");
		$("#joc").removeClass("hidden");
		$("#controls").removeClass("hidden");
		inicializaVariables();
		inicializaJuego();
	});	

}