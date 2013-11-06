var vidas;
var palabras;
var img=0;

function iniciaPartida()
{
	vidas = 9;
	num = Math.floor(Math.random() * (palabras.length+1)) ;
	alert(palabras[num]+"-"+palabras[num].length);

	$("#colgado").attr("src","img/a1.png");
	$("#anadirPalabra").addClass("hidden");
	$("#empezar").addClass("hidden");
	$("#letras").removeClass("hidden");
	$("#info").removeClass("hidden");

	$("#TBL").empty();
	$("#TBL").attr("class","");
	$("#TBL").addClass("TBL"+palabras[num].length);

	for (var i = 0; i < palabras[num].length; i++) {
		$(document.createElement("input"))
			.attr("id","TB"+i)
			.attr("type","text")
			.attr("maxlength",1)
			.addClass("TBletras")
			.appendTo("#TBL");
	};
}

function validar()
{
	$("#info").addClass("hidden");
	$("#final").removeClass("hidden");
}

jQuery(document).ready(function($) {

	palabras = new Array("APPLE","FERRARI","COCACOLA","GOOGLE","LEVIS","FNAC","SONY","VODAFONE","REDBULL","NIKE");
	
	$("#nuevaPalBut").click(function(event) {
		if($("#nuevaPal").val().trim() == "")
			$("#nuevaPalMis").text("Introduce una palabra").css("color","red");
		else if($("#nuevaPal").val().length < 4 || $("#nuevaPal").val().length >8)
			$("#nuevaPalMis").text("Entre 4 i 8 caracteres").css("color","red");
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
});