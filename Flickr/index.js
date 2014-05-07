var usID;
var tag;
var map;
var myLatlng;




jQuery(document).ready(function($) {
	$("#busca").popover({
		title:"Ayuda",
		content:"Pulsa para buscar las etiquetas del usuario introducido",
		trigger:"hover",
		placement:"bottom"
	});

	$("#carga").popover({
		title:"Ayuda",
		content:"Pulsa para buscar las fotos del usuario con la etiqueta seleccionada",
		trigger:"hover",
		placement:"bottom"
	});

	$("#busca").popover('show');
	
	$('#big').on('hidden.bs.modal', function (e) {
		$(".collapse.in").removeClass('in');
		$("#collapseOne").addClass('in');
	});
	function buscaTags()
	{
		$.ajax({
        	type: "GET",
        	url: "http://api.flickr.com/services/rest/?method=flickr.tags.getListUser",
			data:"user_id="+usID+"&format=json&jsoncallback=?&api_key=3d4a4f6e21e636bf4747c06aab893991",
			dataType:"jsonp",
			timeout:10000,
			error: function(jqXHR, textStatus, errorThrown) 
			{
				//console.log("error petición ajax");
				if (textStatus == "timeout")
                {
					$("#errUs").show();
					$("#errUs").text("Lo sentimos, la carga de los tags del usuario ha excedido el tiempo");
					$("#busca").text("Buscar Usuario");
                }
                else 
                {
					$("#errUs").show();
					$("#errUs").text("Error AJAX");
                }
			},
			success: function(data)
			{ 
				$("#busca").text("Buscar Usuario");
				console.log(data);
				$("#tagSelect").empty();
				$("#tagSelect").show();
				$("#carga").show();
				$(document.createElement("option"))
						.attr("value","")
						.text("Todos")
						.appendTo('#tagSelect')

				if(data.who.tags.tag.length > 0)
				{
					for (var i = 0; i < data.who.tags.tag.length; i++) {
						//console.log(data.who.tags.tag[i]["_content"]);
						$(document.createElement("option"))
							.attr("value",data.who.tags.tag[i]._content)
							.text(data.who.tags.tag[i]._content)
							.appendTo('#tagSelect')
					};
					$("#carga").popover('show');
				}
			}
      	});
	}

	//busca las fotos del usuario en flickr
	$("#carga").click(function(event) {
		tag = $( "#tagSelect" ).val();
		$("#portada").hide();
		$("#fotos").empty();
		$("#fotos").show();
		$.ajax({
        	type: "GET",
        	url: "http://api.flickr.com/services/rest/?method=flickr.people.getPhotos",
			data:"tags="+tag+"&user_id="+usID+"&format=json&jsoncallback=?&api_key=3d4a4f6e21e636bf4747c06aab893991",
			dataType:"jsonp",
			error: function()
			{
				console.log("error petición ajax");
			},
			success: function(data)
			{ 
				//console.log(data);
				$("#errUs").hide();
				if(data.photos.photo.length > 0)
				{
					for (var i = 0; i < data.photos.photo.length; i++) {
						//console.log(data.photos.photo[i].id);
						var id = data.photos.photo[i].id;
						var farmId = data.photos.photo[i].farm;
						var serverId = data.photos.photo[i].server;
						var secret = data.photos.photo[i].secret;
						var title = data.photos.photo[i].title;
						//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
						
						$("#fotos").append
						(
							$(document.createElement("img"))
								.addClass('img_little')
								.attr("id","img"+i)
								.attr("src","http://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+"_n.jpg")
								.attr("data-toggle","modal")
								.attr("data-target","#big")
								.attr("idImg",id)
								.attr("alt",title)
								.click(function(event) {
									$("#img_big").attr("src",$(this).attr("src").replace("_n","_b"));
									$(".modal-title").text($(this).attr("alt"))
									$.ajax({
							        	type: "GET",
							        	url: "http://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation",
										data:"photo_id="+$(this).attr("idImg")+"&format=json&jsoncallback=?&api_key=3d4a4f6e21e636bf4747c06aab893991",
										dataType:"jsonp",
										error: function()
										{
											console.log("error petición ajax");
										},
										success: function(data)
										{ 
											if(data.stat == "ok")
											{
												$("#mapa").empty();
												//console.log(data);
												myLatlng = new  google.maps.LatLng(data.photo.location.latitude, data.photo.location.longitude);
												var mapOptions = {
													center: myLatlng,
												  	zoom: 15
												};
												map = new google.maps.Map(document.getElementById("mapa"),mapOptions);

												var marker = new google.maps.Marker({
												    position: myLatlng,
												    title:title
												});

												// To add the marker to the map, call setMap();
												marker.setMap(map);
											}
										}
							      	});
									$.ajax({
							        	type: "GET",
							        	url: "http://api.flickr.com/services/rest/?method=flickr.photos.comments.getList",
										data:"photo_id="+$(this).attr("idImg")+"&format=json&jsoncallback=?&api_key=3d4a4f6e21e636bf4747c06aab893991",
										dataType:"jsonp",
										error: function()
										{
											console.log("error petición ajax");
										},
										success: function(data)
										{ 
											//console.log(data);
											if(data.stat == "ok")
											{
												$("#comments").empty();
												for (var i = 0; i < data.comments.comment.length; i++) {
													$("#comments").append
													(
														$(document.createElement("div"))
															.css("width","800px")
															.css("margin","10px auto")
															.css("text-align","left")
															.addClass('alert alert-info')
															.text(data.comments.comment[i]._content)
													)
												}
											}
										}
							      	});
								})

						);
						
						$("#img"+i).animate({
							"opacity": 1
						},1000)
					};
				}
				else
				{
					$("#errUs").show();
					$("#errUs").text("El usuario no tiene fotos");
				}
			}
      	});
	});	

	//busca el usuario en flickr;
	$("#busca").click(function(event) {
		$("#busca").text("Buscando...");
		$("#tagSelect").hide();
		$("#errUs").hide();
		$("#fotos").hide();
		$("#carga").hide();
		$("#portada").show();
		$.ajax({
        	type: "GET",
        	url: "http://api.flickr.com/services/rest/?method=flickr.people.findByUsername",
			data:"username="+$("#buscaNom").val()+"&format=json&jsoncallback=?&api_key=3d4a4f6e21e636bf4747c06aab893991",
			dataType:"jsonp",
			error: function()
			{
				console.log("error petición ajax");
			},
			success: function(data)
			{ 
				console.log(data);
				if(data.stat == "ok")
				{
					//console.log(data);
					usID = data.user.id;
					buscaTags();
				}
				else
				{
					$("#errUs").show();
					$("#errUs").text("Este usuario no existe");
					$("#busca").text("Buscar Usuario");
				}

				//for (var i = 0; i <= data.photos.photo.length; i++) {
				//};
			}
      	});
	});	
});