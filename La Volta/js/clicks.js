//Gestionamos los clicks de los botones

function gestionaClicks()
{	

	$("#butNueva").click(function(event) {
		$("#portada").addClass("hidden");
		$("#configuration").removeClass("hidden");
	});

	$("#butSalir").click(function(event) {
		$("#portada").removeClass("hidden");
		$("#joc").addClass("hidden");
		$("#controls").addClass("hidden");
		reiniciaVariables();
	});

	$("#butTurno").click(function(event) {
		$(this).addClass('disabled');
		$(this).text("Simulando...");
		pasarTurno();
		setTimeout(function(){
			$("#butTurno").removeClass('disabled');
			$("#butTurno").text("Pasar Turno");
		},2000);
	});

	//Botones guardar y cargar
	$("#butGuardar").click(function(event) {
		cogePartidas("#partidasG");
	});
	$("#butCargar").click(function(event) {
		cogePartidas("#partidasC");
	});

	//botones del modal guardar
	$("#guardarConf").click(function(event) {
		actualizaWidth();
		guardar($("#tbGuardar").val().trim(),estadoPartida);
		$("#tbGuardar").val("");
	});
	$("#guardarCanc").click(function(event) {
		$("#tbGuardar").val("");
	});

	//botones del modal cargar
	$("#cargarConf").click(function(event) {
		$("#tbCargar").val("");
		//alert(partida);
		$("#portada").addClass("hidden");
		$("#joc").removeClass("hidden");
		$("#controls").removeClass("hidden");
		carga();
	});
	$("#cargarCanc").click(function(event) {
		$("#tbCargar").val("");
	});


	$(".butSi").click(function(event) {
		var divId = $(this).parent().parent().parent().parent().parent().attr("id");
		if(divId == "cargar")
			borra("#partidasC");
		else
			borra("#partidasG");
		$(".okBorrar").addClass('hidden');
		$(".butGC").removeClass('disabled');
	});

	$(".butNo").click(function(event) {
		$(".okBorrar").addClass('hidden');
		$(".butGC").removeClass('disabled');
	});

	$(".butGC").click(function(event) {
		$(".okBorrar").addClass('hidden');
	});

	$(".ajusteEquipos").click(function(event) {
		//Hay que saber el equipo
		var id = $(this).attr("id")
		var eq = id[id.length-1];
		$("#corredoresMet").empty();
		$("#botonesConf").empty();
		$("#mensajeConfDan").addClass("hidden");
		$("#mensajeConfSuc").addClass("hidden");
		$(document.createElement("span"))
			.text("Total Equipo: "+puntEquipos)
			.addClass("pull-right")
			.appendTo("#corredoresMet");
		$(document.createElement("br"))
			.appendTo("#corredoresMet");
		$(document.createElement("br"))
			.appendTo("#corredoresMet");

		for(i=0;i<estadoPartida[eq][1].length;i++){
			$(document.createElement("span"))
				.text("Corredor: "+estadoPartida[eq][1][i][0]+", Rol: "+estadoPartida[eq][1][i][1])
				.appendTo("#corredoresMet");
			$(document.createElement("br"))
				.appendTo("#corredoresMet");
			$(document.createElement("input"))
				.addClass("puntCorr")
				.attr("value",estadoPartida[eq][1][i][4].toString())
				.appendTo("#corredoresMet");
			$(document.createElement("br"))
				.appendTo("#corredoresMet");
			$(document.createElement("br"))
				.appendTo("#corredoresMet");
		}

		$(document.createElement("button"))
			.text("Confirmar Cambios")
			.addClass("btn btn-success pull-left")
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
						estadoPartida[eq][1][k][4] = parseInt($(this).val());
						k++;
					});
					$("#mensajeConfDan").addClass("hidden");
					$("#mensajeConfSuc").removeClass("hidden");
					$("#mensajeConfSuc").text("Cambios realizados");
				}
			})
			.appendTo("#botonesConf");
		$(document.createElement("button"))
			.text("Cancelar Cambios")
			.attr("data-dismiss","modal")
			.addClass("btn btn-danger pull-right")
			.appendTo("#botonesConf");

	});

	$('.maillots').click(function(event) {
		$("#"+eqUs).removeClass("active");
		$("#"+eqUs).removeClass("btn-success");
		eqUs = $(this).attr("id");
		//alert(eqUs);
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$("#mensajeStep1").addClass('hidden');
	});

	$('.maillotsRiv').click(function(event) {
		$("#"+eqRiv).removeClass("active");
		$("#"+eqRiv).removeClass("btn-danger");
		eqRiv = $(this).attr("id");
		//alert(eqRiv);
		$(this).addClass("active");
		$(this).addClass("btn-danger");
		$("#mensajeStep2").addClass('hidden');
	});

	$(".btnNext").click(function(event) {
		switch(currentIndex)
		{
			case 1:
				if(eqUs == null)
					$("#mensajeStep1").removeClass('hidden');
				else
					$("#confCarousel").carousel('next');
				break;
			case 2:
				if(eqRiv == null)
					$("#mensajeStep2").removeClass('hidden');
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
				$("#"+eqRiv).removeClass("active");
				$("#"+eqRiv).removeClass("btn-danger");
				eqRiv = null;
				break;
		}
		$("#confCarousel").carousel('prev');
	});	

	$("#empezar").click(function(event) {
		$("#configuration").addClass("hidden");
		$("#joc").removeClass("hidden");
		$("#controls").removeClass("hidden");
		inicializaVariables();
		inicializaJuego();
	});	
}