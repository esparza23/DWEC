var vidas;
var palabras;
var img;
var horaIn;
var segundos;
var s,m,h,st,mt,ht;
var num;
var cont;
var aciertos;

//funcion para conseguir la hora en String a partir de un objeto date.
function tornaStringHora(date)
{
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(h<10)
		h="0"+h;
	if(m<10)
		m="0"+m;
	if(s<10)
		s="0"+s;

	return "Hora Inicio: "+h+":"+m+":"+s;
}

//funcion para clacular el tiempo transcurrido jugando
function calculaTiempo()
{
	s++;
	if(s>59)
	{
		s = 0;
		m++;
		if(m>59)
		{
			m = 0;
			h++;
			if(h>23)
				h = 0;
		}
	}

	ht = h;
	mt = m;
	st = s;

  	if(h<10)
		ht="0"+ht;
	if(mt<10)
		mt="0"+mt;
	if(st<10)
		st="0"+st;
	return "Tiempo Transcurrido: "+ht+":"+mt+":"+st;
	//$("#duracion").text("Tiempo Transcurrido: "+ht+":"+mt+":"+st);
}

//funcion que prepara la web para jugar
function iniciaPartida()
{
	//Guardamos la hora de inicio timer para los segundos
	horaIn = new Date();
	s = h = m = 0;
	setInterval(function(){
			$("#duracion").text(calculaTiempo());
	},1000);
	$("#tiempoIn").text(tornaStringHora(horaIn));

	//Ponemos las vidas a 8 y escogemos una palabra al azar. Aqui se aplica el metodo random de la clase Math.
	vidas = 8;
	aciertos = 0;
	img=1
	num = Math.floor(Math.random() * (palabras.length));


	//Ocultamos y mostramos los componentes necesarios
	$("#colgado").attr("src","img/a1.png");
	$("#instrucciones").addClass("hidden");
	$("#anadirPalabra").addClass("hidden");
	$("#empezar").addClass("hidden");
	$("#validar").text("Validar");
	$("#letras").removeClass("hidden");
	$("#info").removeClass("hidden");
	$("#vidas").text("Vidas: "+vidas);
	$("#letra").val("");
	$("#letra").removeAttr("disabled");

	$("#TBL").empty();
	$("#TBL").attr("class","");
	$("#TBL").addClass("TBL"+palabras[num].length);

	//agregamos los textbox necesarios segun la palabra
	for (var i = 0; i < palabras[num].length; i++) {

		$(document.createElement("div"))
			.attr("id","TBdiv"+i)
			.addClass("TBdiv form-group")
			.appendTo("#TBL");

		$(document.createElement("input"))
			.attr("id","TB"+i)
			.attr("type","text")
			.attr("maxlength",1)
			.attr("disabled","disabled")
			.addClass("TBletras form-control")
			.appendTo("#TBdiv"+i);
	};
}

function mensajeFinal(mensaje)
{
	$("#validar").text("Salir");
	$("#mensaje").css("font-size","1.5em");
	$("#mensaje").text(mensaje+calculaTiempo());
	$("#info").addClass("hidden");
	$("#final").removeClass("hidden");
	$("#divLetra").removeClass("has-error");
	$("#divLetra").removeClass("has-success");
	$("#letra").val("");
	$("#letra").attr("disabled","disabled");
}

function finalPartida()
{
	$("#anadirPalabra").removeClass("hidden");
	$("#empezar").removeClass("hidden");
	$("#instrucciones").removeClass("hidden");
	$("#letras").addClass("hidden");
	$("#info").addClass("hidden");
	$("#final").addClass("hidden");
	$("#colgado").attr("src","img/a9.png");
}

//funcion que retorna los indices donde aparece una letra en una palabra. En nuestro casa siempre se llama sabiendo que existe.
function busca(letra,palabra)
{
	indices = new Array();
	for (var i = 0; i < palabra.length; i++) {
		if(palabra[i]==letra)
			indices.push(i);
	};
	return indices;
}

function error()
{
	$("#divLetra").addClass("has-error");
	$("#colgado").attr("src","img/a"+(img+1)+".png");
	$("#colgado").attr("alt","colgado"+img);
	img++;
	vidas--;
	$("#vidas").text("Vidas: "+vidas);
	if(vidas==0)
	{
	 	mensajeFinal(" Lo siento, perdiste! ");
	 	//Recorremos los textbox para colocar las letras restantes y mostrarselas al usuario
		var l = 0;
		$(".TBdiv").each(function(){
			if($(this).find(':first-child').val()=="")
			{
				$(this).addClass("has-error");
				$(this).find(':first-child').css("background-color","#ffc2a9");
				$(this).find(':first-child').val(palabras[num][l]);
			}
			else
				$(this).find(':first-child').css("background-color","#acff8b");
			l++;
		});
	}
	 if(img==9)
	{
		setTimeout(function(){
			$("#colgado").attr("src","img/a10.png");
		},250);
	}
}

function acierto(letra,indices)
{
	var indices = busca(letra,palabras[num]);
	for(ind in indices)
	{
		$("#TBdiv"+indices[ind]).addClass("has-success");
		$("#TB"+indices[ind]).val(palabras[num][indices[ind]]);
		$("#divLetra").addClass("has-success");
	}
	aciertos+=indices.length;
	if(aciertos == palabras[num].length )
	{
	 	mensajeFinal(" Enhorabuena! ");
	 	$("#colgado").attr("src","img/a11.png");
	 	$(".TBdiv").each(function(){
			$(this).find(':first-child').css("background-color","#acff8b");
		});
	}
}

//funcion que gestiona el click del boton validar. Hay que mejorarla!!
function validar()
{
	
	if($("#validar").text()=="Validar")
	{
		//SI el usuario no introduce ninguna letra, mostramos mensaje de erro
		if($("#letra").val().trim() == "")
		{
			$('#letra').popover('show');
			setTimeout(function()
			{
				$('#letra').popover('hide');
			},1500);
		}
		//Comprobamos la letra introducida por el usuario.
		else
		{
			//Cogemos la letra introducida y la buscamos en la palabra
			var letra = $("#letra").val().toUpperCase();
			var indices = busca(letra,palabras[num]);
			
			//Gestion si la letra no ESTA en la palabta
			if(indices.length == 0)
				error();
			
			//Gestion si la letra esta en la palabta
			else
				acierto(letra,indices);
		}
	}
	else if($("#validar").text()=="Salir")
	{
		finalPartida();
	}
	/*
	if($("#letra").val().trim() == "")
	{
		$('#letra').popover('show');
		setTimeout(function()
		{
			$('#letra').popover('hide');
		},1500);
	}
	else
	{
		var letra = $("#letra").val()
		if(palabras[num].search(letra)==-1)
		{
			if($("#validar").text()=="Salir")
			{
				$("#colgado").attr("src","img/a1.png");
				finalPartida();
			}
			else if(img<10)
			{
				$("#divLetra").addClass("has-error");
				$("#colgado").attr("src","img/a"+(img+1)+".png");
				$("#colgado").attr("alt","colgado"+img);
				img++;
				$("#vidas").text("Vidas: "+vidas);
				vidas--;
				if(img==9)
				{
					setTimeout(function(){
						$("#colgado").attr("src","img/a10.png");
					},250);
					$("#validar").text("Salir");
					$("#mensaje").css("font-size","1.5em");
					$("#mensaje").text(" Lo siento, perdiste! "+calculaTiempo());
					$("#info").addClass("hidden");
					$("#final").removeClass("hidden");

					//Recorremos los testbox para colocar las letras restantes y mostrarselas al usuario
					var l = 0;
					$(".TBdiv").each(function(){
						if($(this).find(':first-child').val()=="")
						{
							$(this).addClass("has-error");
							$(this).find(':first-child').css("background-color","#ffc2a9");
							$(this).find(':first-child').val(palabras[num][l]);
						}
						else
							$(this).find(':first-child').css("background-color","#acff8b");
						l++;
					});

				}
			}
		}
		else
		{
			var indices = busca(letra,palabras[num]);
			for(ind in indices)
			{
				$("#TBdiv"+indices[ind]).addClass("has-success");
				$("#TB"+indices[ind]).val(palabras[num][indices[ind]]);
				$("#divLetra").addClass("has-success");
				//alert(indices[ind]);
			}
			aciertos+=indices.length;
			if(aciertos == palabras[num].length )
			{
				$("#validar").text("Salir");
				$("#mensaje").css("font-size","1.5em");
				$("#mensaje").text(" Enhorabuena! "+calculaTiempo());
				$("#info").addClass("hidden");
				$("#final").removeClass("hidden");
			}
		}
	}
	*/
}

//funcion para mostrar mensajes al añadir una nueva palabra al array
function popoverNuevaPalabra(frase)
{
	cont = frase;
	$('#nuevaPalBut').popover('show');
	setTimeout(function()
	{
		$('#nuevaPalBut').popover('hide');
	},1500);
}

//funcion que gestiona el click de añadir palabra
function nuevaPalabra()
{
	var pal = $("#nuevaPal").val().trim().toUpperCase();
	if(pal == "")
		popoverNuevaPalabra("Introduce una palabra.");
	else if(pal.length < 4 || pal.length >8)
		popoverNuevaPalabra("Entre 4 i 8 caracteres.");
	else
	{
		if(palabras.indexOf(pal)!=-1)
			popoverNuevaPalabra("La palabra ya esta en el juego.");
		else{
			$("#nuevaPalMis").text("");
			palabras.push(pal);
			$("#nuevaPal").val("");
			popoverNuevaPalabra("Palabra anadida.");
		}
	}
}

//funcion que se ejecuta cuando se carga la pagina!
jQuery(document).ready(function($) {

	palabras = new Array("APPLE","FERRARI","COCACOLA","GOOGLE","LEVIS","FNAC","SONY","VODAFONE","REDBULL","NIKE");
	
	//asignamos el evento click al boton nueva palabra
	$("#nuevaPalBut").click(function(event) {
		nuevaPalabra();
	});
	//asignamos el evento click al boton empezar
	$("#empezar").click(function(event) {
		iniciaPartida();
	});
	//asignamos el evento click al boton validar
	$("#validar").click(function(event) {
		validar();
	});
	//asignamos el evento click al textbox letra(donde el usuario introduce letras)
	$("#letra").focus(function(event) {
		$("#divLetra").removeClass("has-error");
		$("#divLetra").removeClass("has-success");
	});

	//Creamos los popovers para mostrar mensajes del textbox letra y el boton nueva palabra
	$("#letra").popover({
			content:"No puede estar vacia",
			trigger:"manual",
			delay: { show: 300, hide: 1000 }
	});
	//EN este popover, el contenido sera un String que le pasaremos por parametro
	$("#nuevaPalBut").popover({
		content: function contPopover()
				{
					return cont;
				},
		trigger:"manual",
		delay: { show: 300, hide: 1000 }
	});
});