jQuery(document).ready(function($) {
	
	$( "#porVerde" ).slider({
		value:0.50,
		min: 0.50,
		max: 0.90,
		step: 0.05,
		stop: function( event, ui ) 
		{
			porVerda = ui.value;
		}
    });


    $( "#porLlenas" ).slider({
		value:0.30,
		min: 0.30,
		max: 0.50,
		step: 0.05,
		stop: function( event, ui ) 
		{
			porCas = 1-ui.value;
		}
    });

	$("#comen").click(function(event) {
		switch($('input[name=joc]:checked').val())
		{
			case "joc1":
				feliz = felizIguales;
				busca = iguales;
				break;
			case "joc2":
				feliz = felizContrario;
				busca = contrario;
				break;
			case "joc3":
				break;
		}	
		switch($('input[name=veins]:checked').val())
		{
			case "vei1":
				minim = 1;
				break;
			case "vei2":
				minim = 2;
				break;
			case "vei3":
				minim = 3;
				break;
		}	
		porVerda = $( "#porVerde" ).slider( "value" );
		porCas = 1-$( "#porLlenas" ).slider( "value" );
		casPlenes = casTotal*porCas;
		ficVerdes = casPlenes*porVerda;
		ficBlaves = casPlenes-ficVerdes;
		$("#tauler").empty();
		tauler = new Tauler(10,10,10,15);
		$("#tauler").css("width",10*67+"px");
		$("#tauler").css("margin","auto");
		tauler.pintarTauler();

		//var numFicha = 0;

	});
});