/* Libreria donde tendremos funciones utiles para nuestro programa */

var utils =
{
	//Funcion para mostrar mensaje de error por consola, si estamos debugando.
	alert : function(mensaje)
	{
		if(config.debug)
			console.log(mensaje);
	},

	//Funcion que devuelve un entero con la parte numerica de un string.
 	numero : function(cadena)
	{
		var numero = "";
		for (i = 0; i < cadena.length; i++) {
		    if (cadena.charAt(i) >= '0' && cadena.charAt(i) <= '9')
		    {
		        numero += cadena.charAt(i);
		    }
		}
		return parseInt(numero);
	},

	//Funcion que le quita las clases  que empiecen por class(para los colores)
	cambiarClase : function(id,nuevaClase)
	{
		//Cogemos todas las clases del color
		var aryClasses = $(id).attr('class').split(' ');

		//nos movemos por las clases,, mirando si alguna contiene el string class
		for(var i = 0; i < aryClasses.length; i++)
		{
		    //Si contiene Class, la quitamos del div
		    if(aryClasses[i].indexOf('class') != -1)
		        $(id).removeClass(aryClasses[i]);
		}
		//añadimos la nueva clase
		$(id).addClass(nuevaClase);
	},

	//Funcion que dado un array y una posicion, lo devuelve copiado sin la posicion especificada
	eliminarItemArray : function(array,n)
	{
		var cop = new Array();
		for(j=0;j<array.length;j++)
			if(j!=n)
				cop.push(array[j]);
		return cop;
	}
}
