//variables "globales" para controlar el juego.
var eqUs= null;
var eqRiv = null;
var jugEq = null;
var numEq = 2;
var equipo1 = null;
var equipo2 = null;
var estadoPartida = null;
var puntEquipos = null;
var acabados = 0;

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
	$("#imgEquipo1").tooltip('destroy');
	$("#imgEquipo2").tooltip('destroy');
	eqUs = null;
	eqRiv = null;
	jugEq = null;
	numEq = 2;
	equipo1 = null;
	equipo2 = null;
	estadoPartida = null;
	puntEquipos = null;
	acabados = 0;

}

//funcion que genera los ciclistas(y todo lo que ello conlleva) segun el numero que haya introducido el usuario.
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
				.attr("id","rowCic"+j+i)
				.append
				(
					$(document.createElement("div"))
						.addClass('col-md-10')
								.append
								(
									$(document.createElement("span"))
										.attr("id","macCic"+j+i)
										.addClass("flaticon-person94 ciclista")
								)
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
						)
				)
				.append
				(
					$(document.createElement("div"))
						.addClass('col-md-2')
						.append
						(
							$(document.createElement("img"))
								.addClass("imgPos")
								.attr("id","img"+j+i)
								.attr("src","")
						)
						.append
						(
							$(document.createElement("button"))
								.attr("id","butCic"+j+i)
								.attr("type","button")
								.attr("data-toogle","modal")
								.attr("data-target","#historial")
								.addClass("btn btn-default btn-lg histBut")
								.click(function(event) {
									$('#historial').modal();
									historial($(this).attr("id"));
								})
								.append
								(
									$(document.createElement("span"))
										//.addClass("glyphicon glyphicon-time")
										.addClass("flaticon-look hist")
										//.text("Hist")
								)
						)
				)
				.appendTo("#ciclistes"+j);
		}
	}
	$(".histBut").tooltip({
		placement:"left",
		title:"Historial Movimiento"
	});
}

//funcion que inicializa el juego, colocando los maillots de los equipos escogidos y colocando los ciclistas.
function inicializaJuego()
{
	eqUs = eqUs.replace("Us","");
	eqRiv = eqRiv.replace("Riv","");
	$("#equipo1").text(eqUs.toUpperCase())
	$("#equipo2").text(eqRiv.toUpperCase());
	$("#imgEquipo1").attr("src","img/maillots/"+eqUs+".png");
	$("#imgEquipo1").tooltip({
		placement:"right",
		title:''+eqUs
	});
	$("#imgEquipo2").attr("src","img/maillots/"+eqRiv+".png");
	$("#imgEquipo2").tooltip({
		placement:"right",
		title:''+eqRiv
	});

	generaCorredores();
	
}

//Funcion que crea el array donde guardar la informacion de la partida
function inicializaVariables()
{

	jugEq = $("#jugEq").val();
	durEtapa = $("#durEtapa").val();
	puntEquipos = 1000+(jugEq-3)*300;
	equipo1 = new Array(eqUs.replace("Us",""));
	equipo2 = new Array(eqRiv.replace("Riv",""));
	jugEq1 = new Array();
	jugEq2 = new Array();
	for(i=0;i<jugEq;i++)
	{
		if(i==0)
		{						  //nombre     rol    Esf  MR  En     Ag    Gr   MMT  Width  Historial
 			jugEq1.push(new Array(nombres1[i],"Lider",50 ,0  ,100  ,100  ,100  ,400,  0,    new Array()));
			jugEq2.push(new Array(nombres2[i],"Lider",50 ,0  ,100  ,100  ,100  ,400,  0,    new Array()));
		}
		else
		{						     //nombre     rol    Esf  MR   En     Ag   Gr   MMT  Width  Historial
			jugEq1.push(new Array(nombres1[i],"Gregario",50  ,0  ,100  ,100  ,100  ,300,  0,    new Array()));
			jugEq2.push(new Array(nombres2[i],"Gregario",50  ,0  ,100  ,100  ,100  ,300,  0,    new Array()));
		}
	}

	/*Creamos la estructura del array donde guardaremos la informacion*/
	estadoPartida = new Array();
	equipo1.push(jugEq1,"1000","1000","1000");
	equipo2.push(jugEq2,"1000","1000","1000");	
	estadoPartida.push(equipo1);
	estadoPartida.push(equipo2);
	estadoPartida.push(durEtapa);
}

//funcion que carga los datos de la indexedDB en el array informacion, y coloca los corredores 
//	como estaban antes(y todo lo que eso conlleva).
function carga()
{
	estadoPartida = partida;
	durEtapa = estadoPartida[2];
	eqUs= estadoPartida[0][0];
	eqRiv = estadoPartida[1][0];
	jugEq = estadoPartida[0][1].length;
	puntEquipos = 1000+(jugEq-3)*300;

	generaCorredores();
	$("#equipo1").text(eqUs.toUpperCase())
	$("#equipo2").text(eqRiv.toUpperCase());
	$("#imgEquipo1").attr("src","img/maillots/"+eqUs+".png");
	$("#imgEquipo1").tooltip({
		placement:"right",
		title:''+eqUs
	});
	$("#imgEquipo2").attr("src","img/maillots/"+eqRiv+".png");
	$("#imgEquipo2").tooltip({
		placement:"right",
		title:''+eqRiv
	});

	
	for (var i = 0; i < estadoPartida.length-1; i++) {
		for (var j = 0; j < estadoPartida[i][1].length; j++) {
			var por = estadoPartida[i][1][j][8];
			$("#cic"+i+j).css("width",por+"%");
			$("#macCic"+i+j).css("padding-left",por+"%");
		};
	};
}

//funcion que guarda el ancho de la progress bar en el array informacion
function actualizaWidth()
{
	for(j=0;j<numEq;j++)
	{
		for (var i = 0; i < estadoPartida[j][1].length; i++) {
			var p = (estadoPartida[j][1][i][3]*100)/durEtapa;
			estadoPartida[j][1][i][8] = p;
		}
	}
}


//Funcion que calcula cuantos metros se movera cada ciclista.
function pasarTurno()
{
	for (var j = 0; j < numEq; j++) {
		for (var i = 0; i < jugEq; i++) {
			if(estadoPartida[j][1][i][4] == 0 || estadoPartida[j][1][i][5] == 0 || estadoPartida[j][1][i][6] == 0)
			{
				$("#img"+j+i).attr("src","img/error-48.png");
				$("#img"+j+i).tooltip({
					placement:"top",
					title:"Te falta alimento"
				});
			}
			else
			{
				$("#img"+j+i).attr("src","");
				$("#img"+j+i).tooltip('destroy');
				var metros = Math.floor((estadoPartida[j][1][i][2]*estadoPartida[j][1][i][7])/100);
				
				estadoPartida[j][1][i][4]-= estadoPartida[j][1][i][2];
				estadoPartida[j][1][i][5]-= estadoPartida[j][1][i][2];
				estadoPartida[j][1][i][6]-= 100-estadoPartida[j][1][i][2];
				if(estadoPartida[j][1][i][4] < 0)
					estadoPartida[j][1][i][4]=0;
				if(estadoPartida[j][1][i][5] < 0)
					estadoPartida[j][1][i][5]=0;
				if(estadoPartida[j][1][i][6] < 0)
					estadoPartida[j][1][i][6]=0;

				var metrosAntes = estadoPartida[j][1][i][3];
				var metrosDespues = metrosAntes + metros;
				if(metrosDespues >=  durEtapa)
				{
					metros = durEtapa-metrosAntes;
					metrosDespues = durEtapa;
				}
				estadoPartida[j][1][i][3]+= metros;
				estadoPartida[j][1][i][9].push(metros);
				var p = (metrosDespues*100)/durEtapa;
				if(p>=100)
				{
					$("#cic"+j+i).css("width",p+"%");
					//$("#macCic"+j+i).css("padding-left",p+"%");	
					$("#macCic"+j+i).animate({
					    paddingLeft: "96%"
					  }, "swing", function() {
							//$(this).removeAttr("style");
					  });
					$("#macCic"+j+i).addClass("cicAcabado");
					p = 100;

					//Controlamos las posiciones y ponemos la imagen que toque.
					if( $("#img"+j+i).attr("src")=="")
						acabados++;
					switch(acabados)
					{
						case 1:
							if( $("#img"+j+i).attr("src")=="")
								$("#img"+j+i).attr("src","img/1-48.png");
							break;
						case 2:
							if($("#img"+j+i).attr("src")=="")
								$("#img"+j+i).attr("src","img/2-48.png");
							break;
						case 3:
							if($("#img"+j+i).attr("src")=="")
								$("#img"+j+i).attr("src","img/3-48.png");
							break;
						default:
							if($("#img"+j+i).attr("src")=="")
								$("#img"+j+i).attr("src","img/x-mark-48.png");
							break;
					}
				}
				else
				{
					$("#cic"+j+i).css("width",p+"%");
					//$("#macCic"+j+i).css("padding-left",p+"%");	
					$("#macCic"+j+i).animate({
					    paddingLeft: p+"%"
					  }, "swing");
				}
			}
		}
	}
}


//Funcion que muestra el historial de un ciclista dada una ID
function historial(id)
{
	eq = id[id.length-2];
	cic = id[id.length-1];
	$("#myHistorial").text("Historial Moviments " +estadoPartida[eq][1][cic][0]);
	$("#histMetros").empty();
	if(estadoPartida[eq][1][cic][9].length == 0)
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
		for(i=0;i<estadoPartida[eq][1][cic][9].length;i++)
		{
			$(document.createElement("li"))
				.append(
					$(document.createElement("span")).text("Torn "+(i+1)+" : "+estadoPartida[eq][1][cic][9][i])
				)
			.appendTo("#histMetros");
		}
		$(document.createElement("br"))
		.appendTo("#histMetros");
		$(document.createElement("span")).text("Total metres: "+estadoPartida[eq][1][cic][3])
		.appendTo("#histMetros");
	}
}

//funcion que activa la mayoria de  tooltips que tiene la pagina.
function activaTooltips()
{
	$(".ajusteEquipos").tooltip({
		placement:'right',
		title:'Ajustes de Equipo'
	});

	$(".cicEquipos").tooltip({
		placement:'right',
		title:'Ciclistas del Equipo'
	});

	$(".bolsaEquipos").tooltip({
		placement:'right',
		title:'Bolsa de Equipo'
	});
	
	$("#euskaltelUs, #euskaltelRiv").tooltip({
		placement:'top',
		title:'Euskaltel'
	});
	$("#fdjUs, #fdjRiv").tooltip({
		placement:'top',
		title:'FDJ'
	});
	$("#skyUs, #skyRiv").tooltip({
		placement:'top',
		title:'Sky'
	});
	$("#astanaUs, #astanaRiv").tooltip({
		placement:'top',
		title:'Astana'
	});
	$("#katushaUs, #katushaRiv").tooltip({
		placement:'top',
		title:'Katusha'
	});
	$("#quickstepUs, #quickstepRiv").tooltip({
		placement:'top',
		title:'Quickstep'
	});
	$("#radioshackUs, #radioshackRiv").tooltip({
		placement:'top',
		title:'Radioshack'
	});
	$("#movistarUs, #movistarRiv").tooltip({
		placement:'top',
		title:'Movistar'
	});

	$("#agua").tooltip({
		placement:"top",
		title:"Agua"
	});
	$("#energia").tooltip({
		placement:"top",
		title:"Energia"
	});
	$("#grasa").tooltip({
		placement:"top",
		title:"Grasa"
	});
}

//funcion para cuadrar la portada del juego en responsive.
function resolution()
{
    if ($(window).width() < 992) {
        $("#logoImg").appendTo("#logo");
        $("#logoText1").appendTo("#logo");
        $("#logoText2").appendTo("#logo");
    }
    else
    {
        $("#logoText1").appendTo("#logo");
        $("#logoImg").appendTo("#logo");
        $("#logoText2").appendTo("#logo");
    }
}

//Funcion que se ejecuta cuando  se carga la pagina
jQuery(document).ready(function($) {

	resolution();
	$(window).resize(function () {
        resolution();
    });

	//llamamos a la funcion para abrir la base de datos.
	init();

	//llamamos a la funcion que gestiona los clicks de los botones
	gestionaClicks();
	
	activaTooltips();
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

	$('.carouselMy').carousel({
		wrap:true,
		interval:2500
	});

	//evento cuando nos hemos movido
	$('#confCarousel').bind('slid', function() {
	    currentIndex = $('div.active').index() + 1;
	});
});