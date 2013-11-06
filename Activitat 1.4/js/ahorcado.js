var vidas;
var palabras;
var img=1;
var horaIn;
var segundos;
var s,m,h,st,mt,ht;
var num;
var cont;

//funcion para conseguir la hora en String a partir de un objeto date.
function tornaStringHora(date)
{
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(h<10)
		h="0"+h;
	if(m<10)
		m="0"+m;
	if(s<10)
		s="0"+s;

	return "Hora Inicio: "+h+":"+m+":"+s;
}

//funcion para clacular el tiempo transcurrido jugando
function calculaTiempo()
{
	s++;
	if(s>59)
	{
		s = 0;
		m++;
	}
	if(m>59)
	{
		m = 0;
		h++;
	}
	if(h>23)
		h = 0;

	ht = h;
	mt = m;
	st = s;

  	if(h<10)
		ht="0"+ht;
	if(mt<10)
		mt="0"+mt;
	if(st<10)
		st="0"+st;
	$("#duracion").text("Tiempo Transcurrido: "+ht+":"+mt+":"+st);
}

//funcion que prepara la web para jugar
function iniciaPartida()
{
	//Guardamos la hora de inicio timer para los segundos
	horaIn = new Date();
	s = h = m = 0;
	setInterval("calculaTiempo()",1000);
	$("#tiempoIn").text(tornaStringHora(horaIn));

	//Ponemos las vidas a 8 y escogemos una palabra al azar.
	vidas = 8;
	num = Math.floor(Math.random() * (palabras.length+1));


	//Ocultamos y mostramos los componentes necesarios
	$("#colgado").attr("src","img/a1.png");
	$("#anadirPalabra").addClass("hidden");
	$("#empezar").addClass("hidden");
	$("#letras").removeClass("hidden");
	$("#info").removeClass("hidden");

	$("#TBL").empty();
	$("#TBL").attr("class","");
	$("#TBL").addClass("TBL"+palabras[num].length);

	//agregamos los textbox necesarios segun la palabra
	for (var i = 0; i < palabras[num].length; i++) {

		$(document.createElement("div"))
			.attr("id","TBdiv"+i)
			.addClass("TBdiv form-group")
			.appendTo("#TBL");

		$(document.createElement("input"))
			.attr("id","TB"+i)
			.attr("type","text")
			.attr("maxlength",1)
			.attr("disabled","disabled")
			.addClass("TBletras form-control")
			.appendTo("#TBdiv"+i);
	};
}

function finalPartida()
{

}

function busca(letra,palabra)
{
	indices = new Array();
	for (var i = 0; i < palabra.length; i++) {
		if(palabra[i]==letra)
			indices.push(i);
	};
	return indices;
}

function validar()
{
	$("#info").addClass("hidden");
	if($("#letra").val().trim() == "")
	{
		$('#letra').popover('show');
		setTimeout(function()
		{
			$('#letra').popover('hide');
		},1500);
	}
	else
	{
		var letra = $("#letra").val()
		if(palabras[num].search(letra)==-1)
		{
			$("#colgado").attr("src","img/a"+(img+1)+".png");
			img++;
			if(img==10)
				finalPartida();
		}
		else
		{
			var indices = busca(letra,palabras[num]);
			for(ind in indices)
			{
				alert(indices[ind]);
			}
		}
	}
	//$("#final").removeClass("hidden");
}

//funcion para mostrar mensajes al añadir una nueva palabra al array
function popoverNuevaPalabra(frase)
{

	cont = "Entre 4 i 8 caracteres";
	$('#nuevaPalBut').popover('show');
	setTimeout(function()
	{
		$('#nuevaPalBut').popover('hide');
	},1500);
}


jQuery(document).ready(function($) {

	palabras = new Array("APPLE","FERRARI","COCACOLA","GOOGLE","LEVIS","FNAC","SONY","VODAFONE","REDBULL","NIKE");
	
	$("#nuevaPalBut").click(function(event) {
		if($("#nuevaPal").val().trim() == "")
			popoverNuevaPalabra("Introduce una palabra");
		else if($("#nuevaPal").val().length < 4 || $("#nuevaPal").val().length >8)
			popoverNuevaPalabra("Entre 4 i 8 caracteres");
		else
		{
			$("#nuevaPalMis").text("");
			palabras.push($("#nuevaPal").val().trim().toUpperCase());
			$("#nuevaPal").val("");
			alert(palabras);
		}
	});
	$("#empezar").click(function(event) {
		iniciaPartida();
	});
	$("#validar").click(function(event) {
		validar();
	});
	$("#letra").popover({
			content:"No puede estar vacia",
			trigger:"manual",
			delay: { show: 300, hide: 1000 }
	});
	$("#nuevaPalBut").popover({
		content: function contPopover()
				{
					return cont;
				},
		trigger:"manual",
		delay: { show: 300, hide: 1000 }
	});
});