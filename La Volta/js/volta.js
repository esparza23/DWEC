jQuery(document).ready(function($) {
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
		//moverlo
		$(id).parent().addClass('active');
	    var c1 = setInterval(function()
	    {
			var wid = $(id).css("width",p+"%");
			p++;
			if(p>f)
			{
				$(id).parent().removeClass('active');
				clearInterval(c1);
			}
	    },500);
	}
	/*
	mover("#cic1",1);
	mover("#cic2",2);
	mover("#cic3",3);
	mover("#cic4",4);
	mover("#cic5",5);
	mover("#cic6",20);
	*/
});