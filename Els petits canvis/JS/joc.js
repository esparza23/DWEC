jQuery(document).ready(function($) {

	$("#fireworks").click(function(event) {
		
	});
	//Quitar seleccion de texto(por comodidad)
	window.onload = function()
	{
	     document.onselectstart = function()
	     {
	          return false;
	     } 
	// Firefox
	     document.onmousedown = function()
	     {
	          return false;
	     }
	}

	function treuDesp()
	{
		var cond = 
		setTimeout(function()
		{
			$("#start").addClass('hidden');
			$("#info").addClass('hidden');
		},300);

		$("#conf").animate({
			width: "0px",
		}, 500 );
		$("#conf").css("border","");
		$("#desp").children().remove();
		$("#desp").append
		(
			$(document.createElement("span"))
				.addClass("glyphicon glyphicon-chevron-right white")
		)
		$("#conf2").animate({
			marginRight: "250px"
		}, 500 );
	}

	$("#desp").mouseenter(function(event) {
		if($("#conf").css("width")==0+"px")
		{
			$("#conf").animate({
				width: "350px"
			}, 500 );
			$("#conf").css("border","3px solid #303030");
			$("#desp").children().remove();
			$("#desp").append
			(
				$(document.createElement("span"))
					.addClass("glyphicon glyphicon-chevron-left white")
			)
			$("#start").removeClass('hidden')
			$("#info").removeClass('hidden')
			
			$("#conf2").animate({
				marginRight: "100px"
			}, 500 );
		}
		else
		{
			treuDesp();
		}
	});

	//activamos el Slider de porcentaje fichas verdes
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

	//Activamos el Slider de porcentajes de casillas vacias.
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

    //Funcion que gestiona el click al boton empezar
	$("#comen").click(function(event) {

		treuDesp();
		var reparteix = true;
		feliz = null;
		busca = null;
		//Miramos que normas aplicaremos
		switch($('input[name=joc]:checked').val())
		{
			case "joc1":
				feliz = felizIguales;
				busca = iguales;
				click = false;
				break;
			case "joc2":
				feliz = felizContrario;
				busca = contrario;
				click = false;
				break;
			case "joc3":
				feliz = feliz4Raya;
				busca = busca4Raya;
				reparteix = false;
				click = true;
				turno = true;
				break;
		}	
		//miramos el numero de vecinos
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

		//Calculamos el porcentaje de fichas respecto a las casillas, y las fichas verdes y azules que tendremos.
		porVerda = $( "#porVerde" ).slider( "value" );
		porCas = 1-$( "#porLlenas" ).slider( "value" );
		casPlenes = casTotal*porCas;
		ficVerdes = casPlenes*porVerda;
		ficBlaves = casPlenes-ficVerdes;
		infelices = ficVerdes+ficBlaves;
		dir = new Array(new Array(1,0,1,1,0,-1,-1,-1),new Array(-1,1,0,1,-1,0,-1,1));
		console.log(dir);
		guanyat = false;

		//Vaciamos el antiguo tablero(Si habia alguno) y creamos el nuevo tablero y empezamos a jugar.
		$("#presentacio").remove();
		$("#tauler").empty();
		tauler = new Tauler(10,10);
		$("#tauler").css("width",10*67+"px");
		$("#tauler").css("margin","auto");
		tauler.pintarTauler(reparteix);

	});
});