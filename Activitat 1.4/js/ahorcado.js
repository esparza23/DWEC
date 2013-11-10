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
	//Aqui utilizamos funciones del objeto DATE: getHOusrs,getMinutes y getSeconds.
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(h<10)
		h="0"+h;
	if(m<10)
		m="0"+m;
	if(s<10)
		s="0"+s;

	return " | Inicio: "+h+":"+m+":"+s;
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
	return " | Tiempo: "+ht+":"+mt+":"+st;
}

//funcion que prepara la web para jugar
function iniciaPartida()
{
	//Guardamos la hora de inicio y creamos el timer para el cronometro
	horaIn = new Date();
	s = h = m = 0;
	interval = setInterval(function(){
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
	$("#validar").text("Validar ");
	$(document.createElement("span"))
		.addClass("glyphicon glyphicon-check")
		.appendTo("#validar");
	$("#letras").removeClass("hidden");
	$("#info").removeClass("hidden");
	$("#usadas").removeClass("hidden");
	$("#atras").removeClass('hidden');
	$("#vidas").text("Vidas: "+vidas);
	$("#usadasErr").text("");
	$("#usadasCorr").text("");
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


//funcion que genera la puntuacion dependiendo de los aciertos, las vidas y el tiempo.
function puntuacion()
{
	var punt=0;

	//Aqui utilizamos el metodo search de la clase array,
	if($("#mensaje").text().search("Perdiste")!=-1)
		punt = (aciertos*5)/palabras[num].length;
	else
	{
		punt=5;
		punt+=(vidas*0.25);
		if(h==0 && m <1)
			punt+=3;
		else if(h==0 && m==1 && s<30)
			punt+=2;
		else if(h==0 && m <2)
			punt+=1;
	}
	//aqui utilizamos el metodo toFixed de la clase number.
	return " Puntuacion: "+punt.toFixed(2);
}


//funcion que muestra el mensaje al usuario final, ya sea de victoria o derrota.
function mensajeFinal(mensaje)
{
	$("#validar").text("Salir");
	$("#mensaje").css("font-size","1.5em");
	$("#mensaje").text(mensaje+" | "+calculaTiempo());
	$("#mensaje").text($("#mensaje").text()+" | "+puntuacion());
	$("#info").addClass("hidden");
	$("#final").removeClass("hidden");
	$("#divLetra").removeClass("has-error");
	$("#divLetra").removeClass("has-success");
	$("#atras").addClass('hidden');
	$("#letra").val("");
	$("#letra").attr("disabled","disabled");
}

//funcion que finaliza la partida, ya sea saliendo al acabar o presionando el boton volver atras.
function finalPartida()
{
	$("#anadirPalabra").removeClass("hidden");
	$("#empezar").removeClass("hidden");
	$("#instrucciones").removeClass("hidden");
	$("#letras").addClass("hidden");
	$("#usadas").addClass("hidden");
	$("#info").addClass("hidden");
	$("#final").addClass("hidden");
	$("#colgado").attr("src","img/a9.png");
	s = h = m = 0;
	$("#duracion").text(calculaTiempo());
	clearInterval(interval);
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

//funcion que se lanza cuando el usuario falla una letra.
function error(letra)
{
	$("#divLetra").addClass("has-error");
	$("#colgado").attr("src","img/a"+(img+1)+".png");
	$("#colgado").attr("alt","colgado"+img);
	img++;
	vidas--;
	$("#vidas").text("Vidas: "+vidas);
	$("#usadasErr").text($("#usadasErr").text()+" "+letra+" ");
	if(vidas==0)
	{
	 	mensajeFinal(" Perdiste! ");

	 	//Recorremos los textbox para colocar las letras restantes y mostrarselas al usuario.
		var l = 0;

		//utilizamos el for-each de jquery para recorrer los tb de las letras y marcarlos como correctos o erroneos
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

//funcion que se lanza cuando el usuario acierta una letra, marca las letras acertadas y mira si ganamos la partida.
function acierto(letra,indices)
{
	var indices = busca(letra,palabras[num]);

	//utilizamos el for each de javascript para recorrer el vector donde tiene los indices de las letras acertadas. 
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
	$("#usadasCorr").text($("#usadasCorr").text()+" "+letra+" ");
}

//funcion que gestiona el click del boton validar.
function validar()
{
	if($("#validar").text()=="Validar ")
	{
		//SI el usuario no introduce ninguna letra, mostramos mensaje de error.
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
			//Cogemos la letra introducida y la buscamos en la palabra.
			var letra = $("#letra").val().toUpperCase();
			var indices = busca(letra,palabras[num]);
			
			//aqui utilizamos un booleano para ver si se ha acertado la letra o no.
			var acertada;
			if(indices.length == 0)
				acertada = false;
			else
				acertada = true;
			//Gestion si la letra no ESTA en la palabta
			if(!acertada)
			{
				if($("#usadasErr").text().search(letra)==-1)
					error(letra);
			}

			//Gestion si la letra esta en la palabta
			else 
			{
				if($("#usadasCorr").text().search(letra)==-1)
				acierto(letra,indices);
			}
		}
	}
	else if($("#validar").text()=="Salir")
	{
		finalPartida();
	}
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
			//Aqui utilizamos el metodo push del objeto array.
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

	$("#atras").click(function(event) {
		finalPartida();
	});

	//asignamos el evento click al textbox letra(donde el usuario introduce letras)
	$("#letra").focus(function(event) {
		$("#divLetra").removeClass("has-error");
		$("#divLetra").removeClass("has-success");
		$("#letra").val("");
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