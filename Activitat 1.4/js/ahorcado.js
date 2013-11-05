var vidas;
var palabras;
var img=0;

function iniciaPartida()
{
	vidas = 9;
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
});