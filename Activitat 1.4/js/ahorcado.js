var vidas;
var palabras;
var img=0;

function iniciaPartida()
{
	vidas = 9;
	num = Math.floor(Math.random() * (palabras.length+1)) ;
	alert(palabras[num]+"-"+palabras[num].length);

	$("#anadirPalabra").addClass("hidden");
	$("#letras").removeClass("hidden");
	$("#letras").empty();
	
	for (var i = 0; i < palabras[num].length; i++) {
		$(document.createElement("input"))
			.attr("type","text")
			.attr("maxlength",1)
			.addClass("TBletras")
			.appendTo("#letras");
	};
}

jQuery(document).ready(function($) {
	/*
	setInterval(function()
	{
		img++;
		if(img==10)
			img=1;
		$("#colgado").attr("src","img/a"+img+".png");
	},300);
	*/

	palabras = new Array("APPLE","FERRARI","COCACOLA","GOOGLE","LEVIS","FNAC","SONY","VODAFONE","REDBULL","NIKE");
	
	$("#nuevaPalBut").click(function(event) {
		if($("#nuevaPal").val().trim() == "")
			$("#nuevaPalMis").text("Introduce una palabra").css("color","red");
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
});