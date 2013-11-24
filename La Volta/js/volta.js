var eqUs= null;
var eqRiv = null;
var jugEq = null;
var numEq = 2;
var equipo1 = null;
var equipo2 = null;
var estadoPartida = null;
var puntEquipos = null;

var durEtapa;
var partida;
var currentIndex = 1;

var nombres1 = new Array("Carles","Alberto","Ivan","Pere","Alejandro","Dani","Edu","Mikel");
var nombres2 = new Array("Adri","Carlos","Jordi","Juan","Marcel","David","Ibra","Josep");

//funcion que reinicia las variables para salir de una partida y volver a empezar otra.
function reiniciaVariables()
{
	$("#confCarousel").carousel(0);
	$("#ciclistes0").empty();
	$("#ciclistes1").empty();
	$("#jugEq").val("3");
	$("#durEtapa").val("10000");
	$("#"+eqUs+"Us").removeClass("active");
	$("#"+eqUs+"Us").removeClass("btn-success");
	$("#"+eqRiv+"Riv").removeClass("active");
	$("#"+eqRiv+"Riv").removeClass("btn-danger");
	eqUs = null;
	eqRiv = null;
	jugEq = null;
	numEq = 2;
	equipo1 = null;
	equipo2 = null;
	estadoPartida = null;
	puntEquipos = null;

}

//funcion que genera los ciclistas segun el numero que haya introducido el usuario.
function generaCorredores()
{	
	var col;
	for(j=0;j<numEq;j++)
	{
		if(j==0)
			col="success";
		else 
			col="info";

		for(i=0;i<jugEq;i++)
		{
			var jm = j;
			var im = i;
			$(document.createElement("div"))
				.addClass('row')
				.attr("id","pepa")
				.append
				(
					$(document.createElement("div"))
						.addClass('col-md-1')
						.append
						(
							$(document.createElement("button"))
								.attr("id","butCic"+j+i)
								.attr("type","button")
								.attr("data-toogle","modal")
								.attr("data-target","#historial")
								.addClass("btn btn-default btn-lg")
								.click(function(event) {
									$('#historial').modal();
									historial($(this).attr("id"));
								})
								.append
								(
									$(document.createElement("span"))
										.addClass("glyphicon glyphicon-time")
										.text("Hist")
								)
						)
				)
				.append
				(
					$(document.createElement("div"))
						.addClass('col-md-11')
						.append
						(
							$(document.createElement("div"))
								.attr("id","progCic"+j+i)
								.addClass("progress progress-striped barra progCic")
								.append
								(
									$(document.createElement("div"))
										.attr("id","cic"+j+i)
										.attr("role","progressbar")
										.addClass("progress-bar progress-bar-"+col)
										.attr("aria-valuenow","90")
										.attr("aria-valuemin","0")
										.attr("aria-valuemax","100")
										.attr("style","width:0%")
								)
								.append
								(
									$(document.createElement("span"))
										.attr("id","macCic"+j+i)
										.addClass("flaticon-person94 ciclista1")
								)
						)
				)
				.appendTo("#ciclistes"+j);
		}
	}
}

//funcion que inicializa el juego, colocando los maillots de los equipos escogidos y colocando los ciclistas.
function inicializaJuego()
{
	eqUs = eqUs.replace("Us","");
	eqRiv = eqRiv.replace("Riv","");
	$("#equipo1").text(eqUs.toUpperCase())
	$("#equipo2").text(eqRiv.toUpperCase());
	$("#imgEquipo1").attr("src","img/maillots/"+eqUs+".png");
	$("#imgEquipo2").attr("src","img/maillots/"+eqRiv+".png");

	generaCorredores();
	
}

//Funcion que crea el array donde guardar la informacion de la partida
function inicializaVariables()
{

	jugEq = $("#jugEq").val();
	puntEquipos = 1000+(jugEq-3)*300;
	equipo1 = new Array(eqUs.replace("Us",""));
	equipo2 = new Array(eqRiv.replace("Riv",""));
	jugEq1 = new Array();
	jugEq2 = new Array();
	for(i=0;i<jugEq;i++)
	{
		if(i==0)
		{
			jugEq1.push(new Array(nombres1[i],"Lider",100,0,400,0,new Array()));
			jugEq2.push(new Array(nombres2[i],"Lider",100,0,400,0,new Array()));
		}
		else
		{
			jugEq1.push(new Array(nombres1[i],"Gregario",100,0,300,0,new Array()));
			jugEq2.push(new Array(nombres2[i],"Gregario",100,0,300,0,new Array()));
		}
	}

	/*Creamos la estructura del array donde guardaremos la informacion*/
	estadoPartida = new Array();
	equipo1.push(jugEq1);
	equipo2.push(jugEq2);	
	estadoPartida.push(equipo1);
	estadoPartida.push(equipo2);
	//alert(estadoPartida);
	durEtapa = $("#durEtapa").val();
}

//funcion que carga los datos de la indexedDB en el array informacion, y coloca los corredores como estaban antes.
function carga()
{
	estadoPartida = partida;

	durEtapa = 10000;
	eqUs= estadoPartida[0][0];
	eqRiv = estadoPartida[1][0];
	jugEq = estadoPartida[0][1].length;

	generaCorredores();
	$("#equipo1").text(eqUs.toUpperCase())
	$("#equipo2").text(eqRiv.toUpperCase());
	$("#imgEquipo1").attr("src","img/maillots/"+eqUs+".png");
	$("#imgEquipo2").attr("src","img/maillots/"+eqRiv+".png");
	
	for (var i = 0; i < estadoPartida.length; i++) {
		for (var j = 0; j < estadoPartida[i][1].length; j++) {
			var por = estadoPartida[i][1][j][5];
			$("#cic"+i+j).css("width",por+"%");
		};
	};
}

//funcion que guarda el ancho de la progress bar en el array informacion
function actualizaWidth()
{
	for(j=0;j<numEq;j++)
	{
		for (var i = 0; i < estadoPartida[j][1].length; i++) {
			
			var wid = $("#cic"+j+i).css("width");
		    var widParent = $("#cic"+j+i).parent().css("width");
		    wid = wid.match(/\d/g);
			wid = wid.join("");
		    widParent = widParent.match(/\d/g);
			widParent = widParent.join("");
		    widParent = widParent.match(/\d/g);
			widParent = widParent.join("");
			w = (p*Number(widParent)/100);
			var p = wid*100/widParent;

			estadoPartida[j][1][i][5] = p;
		}
	}
}


//Funcion que calcula cuantos metros se movera cada ciclista.
function pasarTurno()
{
	for (var j = 0; j < numEq; j++) {
		for (var i = 0; i < jugEq; i++) {
			var metros = Math.floor((Math.random()*estadoPartida[j][1][i][4])+1);
			estadoPartida[j][1][i][3]+= metros;
			estadoPartida[j][1][i][6].push(metros);
			mover("#cic"+j+i,Math.floor((metros*100)/(durEtapa)));
		}
	}
}

//Funcion que actualiza la "distancia" de los ciclistas en las progress bar
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

	if(f >100)
		f=100;
	//moverlo de p(principio) a f (final)
	$(id).parent().addClass('active');
    var c1 = setInterval(function()
    {
    	if(f==100)
    	{
    		$(id).css("width","99.8%");
    		$(id).parent().removeClass('active');
			clearInterval(c1);
			//Hacer que ganen o algo...
    	}
    	else
    	{
			$(id).css("width",p+"%");
			p++;
			if(p>f )
			{
				$(id).parent().removeClass('active');
				clearInterval(c1);
			}
		}
    },300);
}

//Funcion que muestra el historial de un ciclista dada una ID
function historial(id)
{
	eq = id[id.length-2];
	cic = id[id.length-1];
	$("#myHistorial").text("Historial Moviments " +estadoPartida[eq][1][cic][0]);
	$("#histMetros").empty();
	if(estadoPartida[eq][1][cic][6].length == 0)
	{
		$(document.createElement("span")).text("Encara no hi ha hagut moviments.")
			.appendTo("#histMetros");
		$("#histMetros").addClass("alert alert-danger");
		$("#histMetros").css("text-align","center");
	}
	else
	{
		$("#histMetros").removeClass("alert alert-danger");
		$("#histMetros").css("text-align","left");
		for(i=0;i<estadoPartida[eq][1][cic][6].length;i++)
		{
			$(document.createElement("li"))
				.append(
					$(document.createElement("span")).text("Torn "+(i+1)+" : "+estadoPartida[eq][1][cic][6][i])
				)
			.appendTo("#histMetros");
		}
		$(document.createElement("br"))
		.appendTo("#histMetros");
		$(document.createElement("span")).text("Total metres: "+estadoPartida[eq][1][cic][3])
		.appendTo("#histMetros");
	}
}

//Funcion que se ejecuta cuando  se carga la pagina
jQuery(document).ready(function($) {

	//llamamos a la funcion para abrir la base de datos.
	init();

	//llamamos a la funcion que gestiona los clicks de los botones
	gestionaClicks();
	
	//gestionamos el cierre de los modales para esconder el mensaje de comnfirmacion
	$('#cargar').on('hidden.bs.modal', function () {
	  $(".okBorrar").addClass('hidden');
	})
	$('#guardar').on('hidden.bs.modal', function () {
	  $(".okBorrar").addClass('hidden');
	})

	//Activamos el carousel de configuracion
	$('.carousel').carousel({
		wrap:false,
		interval:false
	});

	//evento cuando nos hemos movido
	$('#confCarousel').bind('slid', function() {
	    currentIndex = $('div.active').index() + 1;
	});

});