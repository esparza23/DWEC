var cookies = 
{

	//Funcion que crea una cookie dado un nombre, un valor y cuando expira
	setCookie : function(cname,cvalue,exdays)
	{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	//funcion que coge una cookie con un nombre
	getCookie : function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		{
		  	var c = ca[i].trim();
		  	if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	},

	//funcion que comprueba si existe una cookie
	checkCookie : function(cname)
	{
		var cookie=cookies.getCookie(cname);
		if (cookie!="")
		{
			//la cookie existe
			return true;
		}
		else 
		{
			//la cookie NO existe
			return false;
		}
	},

	//funcion que comprueba si existe la cookie de turnos maximos para establecerlos,
	//si no existe la crea.
	comprobarCookieInicio : function()
	{
		if(!cookies.checkCookie("turnosMax"))
		{
			utils.alert("no hay cookie");
			cookies.setCookie("turnosMax","10",1);
		}
		else
		{
			var valor = cookies.getCookie("turnosMax");
			masterUI.ponerValorSlider(valor);
		}
	}
}