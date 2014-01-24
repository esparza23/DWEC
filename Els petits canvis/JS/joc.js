jQuery(document).ready(function($) {
	//$(".circleA").draggable({ revert: "valid" });
	//$(".circleB").draggable({ revert: "valid" });

	$("#start").click(function(event) {
		var tauler = new Tauler(10,10,10,15);
		tauler.pintarTauler();
	});
});