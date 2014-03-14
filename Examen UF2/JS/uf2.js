function compare(a,b) {
	if (a.ataque < b.ataque)
		return 1;
	if (a.ataque > b.ataque)
		return -1;
	return 0;
}

//cunado el documento se carga
jQuery(document).ready(function($) {

	//contorlamos el click del boton de cargar, para llamar al input de seleccinar fichero
	$("#carga").click(function(event) {
		$("input").click();
	});

	//Cuando se selecciona fichero
	$("#input").change(function(event) {

		//cogemos el primer fihcero
		var files = document.getElementById('input').files;
		var file = files[0];

		var reader = new FileReader();
		reader.onloadend = function(evt) 
		{
			if (evt.target.readyState == FileReader.DONE) 
			{ 
				//pasamos el json a objetos
				var info =  JSON.parse(evt.target.result);

				//creamos el juego y lo inicializamos
				var j = new Juego();
				j.crearJuego(info.juego[0].nombre,info.juego[0].debug,info.juego[0].funcionListado);
				
				//creamos los personajes y los inicializamos
				var personajes = new Array()
				for(i=0;i<info.personajes.length;i++)
				{
					var p  = new Personaje();
					p.crearPersonaje(info.personajes[i].nombre,info.personajes[i].apellidos,info.personajes[i].raza,info.personajes[i].nivMagia,info.personajes[i].nivFuerza,info.personajes[i].nivInteligencia,info.personajes[i].funcionAtaque,info.personajes[i].funcionDebug);
					personajes.push(p);
					p.calidadAtaque();
				}

				//Si la opcion debug, esta activa, mostramos la informacion de todos los personajes llamando a la funcion debug que tienen almacenada
				if(j.debug == 1)
				{
					console.log("");
					console.log("---------------DEBUG-----------");
					for(i=0;i<info.personajes.length;i++)
					{
						personajes[i].debug();
					}
					console.log("------------END DEBUG-----------");
					console.log("");

				}

				//Mostramos la informacion del juego
				j.infoJoc();
				personajes  = personajes.sort(compare);
				j.personajes = personajes;
				j.generaListado();
				delete j['personajes'];

				console.log(JSON.stringify(j));
				console.log(JSON.stringify(personajes));
				
			}
		}

		//"cortamos" el fichero desde el principio hasta el fina
		var blob = file.slice(0, file.size);
    	reader.readAsBinaryString(blob);
	});
});