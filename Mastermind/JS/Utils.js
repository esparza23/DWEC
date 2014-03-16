/* Libreria donde tendremos funcines utiles para nuestro programa */

var utils =
{
	//Funcion para mostrar mensaje de error por consola, si estamos debugando.
	alert : function(mensaje)
	{
		if(debug)
			console.log(mensaje);
	}
}
