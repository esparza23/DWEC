jQuery(document).ready(function($) {
	$(".circleA").draggable({ revert: "invalid" });
	$(".circleB").draggable({ revert: "invalid" });
	

	$("#start").click(function(event) {
		tauler = new Tauler(5,5,10,15);
		tauler.pintarTauler();
		//var numFicha = 0;

	});
});