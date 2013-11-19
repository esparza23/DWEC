var equipos;
var durEtapa;
var partida;

function inicializaVariables()
{
	/*Creamos la estructura del array donde guardaremos la informacion*/
	equipos = null;
	equipos = new Array(
		new Array(
			new Array("Carles","Lider",100,0,0,0,new Array()
			)
			,new Array("Alberto","Gregario",100,0,0,0,new Array()
			)
			,new Array("Ivan","Gregario",100,0,0,0,new Array()
			)
		)
		,new Array(
			new Array("Aaron","Lider",100,0,0,0,new Array()
			)
			,new Array("Victor","Gregario",100,0,0,0,new Array()
			)
			,new Array("Cristian","Gregario",100,0,0,0,new Array()
			)
		)
	);
	durEtapa = 10000;
}

function actualizaWidth()
{
	for (var i = 0; i < equipos[0].length; i++) {
		
		var wid = $("#cic0"+i).css("width");
	    var widParent = $("#cic0"+i).parent().css("width");
	    wid = wid.match(/\d/g);
		wid = wid.join("");
	    widParent = widParent.match(/\d/g);
		widParent = widParent.join("");
	    widParent = widParent.match(/\d/g);
		widParent = widParent.join("");
		w = (p*Number(widParent)/100);
		var p = wid*100/widParent;

		equipos[0][i][5] = p;
	}
	for (var i = 0; i < equipos[1].length; i++) {
		var wid = $("#cic1"+i).css("width");
	    var widParent = $("#cic1"+i).parent().css("width");
	    wid = wid.match(/\d/g);
		wid = wid.join("");
	    widParent = widParent.match(/\d/g);
		widParent = widParent.join("");
	    widParent = widParent.match(/\d/g);
		widParent = widParent.join("");
		w = (p*Number(widParent)/100);
		var p = wid*100/widParent;

		equipos[1][i][5] = p;
	}
}

function carga()
{
	durEtapa = 10000;
	equipos = partida;
	for (var i = 0; i < equipos.length; i++) {
		for (var j = 0; j < equipos[i].length; j++) {
			var por = equipos[i][j][5];
			
			$("#cic"+i+j).css("width",por+"%");
		};
	};
}

function pasarTurno()
{
	var totEq = 1000;
	for (var i = 0; i < equipos[0].length; i++) {

		/*Distribuir metros bien hecho...*/

		var metros = Math.floor((Math.random()*totEq)+1);
		totEq-=metros;
		//var metros = Math.floor(totEq/3);

		equipos[0][i][4] = metros;
		equipos[0][i][3]+= metros;
		equipos[0][i][6].push(metros);
		mover("#cic0"+i,Math.floor((equipos[0][i][4]*100)/(durEtapa)));


	};
	totEq = 1000;
	for (var i = 0; i < equipos[1].length; i++) {

		/*Distribuir metros bien hecho...*/
		
		var metros = Math.floor((Math.random()*totEq)+1);
		totEq-=metros;

		//var metros = Math.floor(totEq/3);
		equipos[1][i][4] = metros;
		equipos[1][i][3]+= metros;
		equipos[1][i][6].push(metros);
		mover("#cic1"+i,Math.floor((equipos[1][i][4]*100)/(durEtapa)));

	};
	/*
	alert(equipos[0]);
	alert(equipos[1]);
	*/
}

function mover(id,metros)
{
	//Calcular porcentaje hecho
	var wid = $(id).css("width");
    var widParent = $(id).parent().css("width");
    wid = wid.match(/\d/g);
	wid = wid.join("");
    widParent = widParent.match(/\d/g);
	widParent = widParent.join("");
    widParent = widParent.match(/\d/g);
	widParent = widParent.join("");
	w = (p*Number(widParent)/100);
	var p = wid*100/widParent;
	var f = p + metros;
	//moverlo
	$(id).parent().addClass('active');
    var c1 = setInterval(function()
    {
		var wid = $(id).css("width",p+"%");
		p++;
		if(p>f)
		{
			$(id).parent().removeClass('active');
			clearInterval(c1);
		}
    },100);
}

function historial(id)
{
	eq = id[id.length-2];
	cic = id[id.length-1];;
	$("#myHistorial").text("Historial Moviments " +equipos[eq][cic][0]);
	$("#histMetros").empty();
	for(i=0;i<equipos[eq][cic][6].length;i++)
	{
		$(document.createElement("li"))
			.append(
				$(document.createElement("span")).text("Turno "+(i+1)+" : "+equipos[eq][cic][6][i])
			)
		.appendTo("#histMetros");
	}
}


jQuery(document).ready(function($) {
	init();
	$("#butNueva").click(function(event) {
		$("#portada").addClass("hidden");
		$("#joc").removeClass("hidden");
		$("#controls").removeClass("hidden");
		inicializaVariables();

	});
	$("#butSalir").click(function(event) {
		$("#portada").removeClass("hidden");
		$("#joc").addClass("hidden");
		$("#controls").addClass("hidden");
		$("#cic00").css("width","0%");
		$("#cic01").css("width","0%");
		$("#cic02").css("width","0%");
		$("#cic10").css("width","0%");
		$("#cic11").css("width","0%");
		$("#cic12").css("width","0%");
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
		alert(equipos);
	});
	$("#butCargar").click(function(event) {
		cogePartidas("#partidasC");
	});

	//botones del modal guardar
	$("#guardarConf").click(function(event) {
		actualizaWidth();
		guardar($("#tbGuardar").val().trim(),equipos);
		$("#tbGuardar").val("");
	});
	$("#guardarCanc").click(function(event) {
		$("#tbGuardar").val("");
	});

	//botones del modal cargar
	$("#cargarConf").click(function(event) {
		$("#tbCargar").val("");
		alert(partida);
		$("#portada").addClass("hidden");
		$("#joc").removeClass("hidden");
		$("#controls").removeClass("hidden");
		carga();
	});
	$("#cargarCanc").click(function(event) {
		$("#tbCargar").val("");
	});
	$("#butCic00").click(function(event) {
		historial($(this).attr("id"));
	});
	$("#butCic01").click(function(event) {
		historial($(this).attr("id"));
	});
	$("#butCic02").click(function(event) {
		historial($(this).attr("id"));
	});
	$("#butCic10").click(function(event) {
		historial($(this).attr("id"));
	});
	$("#butCic11").click(function(event) {
		historial($(this).attr("id"));
	});
	$("#butCic12").click(function(event) {
		historial($(this).attr("id"));
	});
});