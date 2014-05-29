// que hace la consulta inicial para mostrar las emisiones
function consultaInicial()
{
	$.ajax({
    	type: "GET",
    	url: "http://www.bbc.co.uk/tv/programmes/genres/drama/scifiandfantasy/schedules/upcoming.json",
		success: function(data)
		{ 
			var series = data.broadcasts;
			console.log(data.broadcasts);
			if(series.length > 0)
			{
				for(i=0;i<series.length;i++)
				{

					//primero miramos si es serie o no para  un par de atributos
					pid=null;
					name ="";
					if(series[i].programme.hasOwnProperty("programme") && series[i].programme.programme.type=="series")
					{
						pid = series[i].programme.programme.pid;
						name =series[i].programme.programme.programme.title+" - "+
								series[i].programme.programme.title+" : "+series[i].programme.title;
					}
					else 
						name = series[i].programme.title;

					$("#series").append
					(
						$(document.createElement("li"))
							.attr("id","serie"+i)
							.attr("pidSerie",pid)
							.text(name)
							.click(muestraInfo)
							.tooltip({
								title:"Ver mas información",
								trigger:"hover",
								placement:"bottom"
							})
					)
				}
			}
		}
  	});
};

//funcion que muestra informacion sobre la serie seleccionada
function muestraInfo()
{
	pidSerie = $("#"+event.target.id).attr("pidSerie");
	if(pidSerie)
	{
		$.ajax({
	    	type: "GET",
	    	url: "http://www.bbc.co.uk/programmes/"+pidSerie+".json",
			success: function(data)
			{ 
				//console.log(data);

				//Añadimos los atributos al div de informacion
				$("#lTit").text(data.programme.title);
				$("#lSin").text("Short Synopsis : " + data.programme.short_synopsis);
				$("#lSinMed").text("Medium Synopsis : " + data.programme.medium_synopsis);
				$("#lPrim").text("First Broadcast Date : "+data.programme.first_broadcast_date);
				var cat ="";
				for(i=0;i<data.programme.categories.length;i++)
				{
					if(i!=0)
						cat+=", "
					cat+=data.programme.categories[i].title;
				}
				$("#lCat").text("Categories : "+cat);

				$("#imgSerie").attr("src","http://ichef.bbci.co.uk/images/ic/480x270/"+data.programme.image.pid+".jpg");
				$("#imgSerie").attr("alt",data.programme.title);
				$("#mensaje").hide();
				$("#info").show();
			}
	  	});
	}
	else
	{
		$("#mensaje").show();
		$("#info").hide();
	}
}

jQuery(document).ready(function($) {
	consultaInicial();
});