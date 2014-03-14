function Personaje()
{
	this.nombre;
	this.apellidos;
	this.raza;
	this.nivMagia;
	this.nivFuerza;
	this.nivInteligencia;
	this.calidadAtaque ;
	this.debug ;
	this.ataque;

	this.crearPersonaje = function(nombreJSON,apellidosJSON,razaJSON,nivMagiaJSON,nivFuerzaJSON,nivInteligenciaJSON,calidadAtaqueJSON,debugJSON)
	{
		this.nombre = nombreJSON;
		this.apellidos = apellidosJSON;
		this.raza = razaJSON;
		this.nivMagia = nivMagiaJSON;
		this.nivFuerza = nivFuerzaJSON;
		this.nivInteligencia = nivInteligenciaJSON;
		this.calidadAtaque = new Function(calidadAtaqueJSON);
		this.debug = new Function(debugJSON);
	}
}