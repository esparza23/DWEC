function Juego()
{
	this.nombre;
	this.debug;
	this.generaListado;
	this.personajes;

	this.infoJoc = function()
	{
		div = $("#contenido");
		div.append
			(
				$(document.createElement("span"))
					.text("Nombre Del Juego: " + this.nombre)
			)
		div.append
			(
				$(document.createElement("br"))
			)
		div.append
			(
				$(document.createElement("span"))
					.text("Modo debug Activo: " + this.debug)
			)
		div.append
			(
				$(document.createElement("br"))
			)
		div.append
			(
				$(document.createElement("br"))
			)
	}

	this.crearJuego = function(nombreJSON,debugJSON,generaListadoJSON)
	{
		this.nombre = nombreJSON;
		this.debug = debugJSON;
		this.generaListado = new Function(generaListadoJSON);
	}
}