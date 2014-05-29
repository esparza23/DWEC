//Libreria donde estan las funciones utiles para el programa

var utils = 
{
	alert : function(mensaje)		//funcion para mostrar mensajes si estamos debugando
	{
		if(config.debug)
			console.log(mensaje);
	},
	mensaje : function(mensaje,clases)		//funcion para mostrar mensajes al usuario
	{
		$("#mensajes").show();
		$("#mensajes").text(mensaje);
		$("#mensajes").removeClass('alert alert-success alert-danger');
		$("#mensajes").addClass(clases);
		setTimeout(function(){
			$("#mensajes").hide();
		},4000);
	}
}