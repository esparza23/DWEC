/* Libreria donde definiremos las funciones para los eventos */

var eventsFunctions = 
{
	//Funcion de prueba
	colorPicker: function(event)
	{
		var nums = utils.numero(event.target.id);
		var numCol = Math.floor(nums/10);
		var numCss = nums%10;
		//utils.alert(numCol+"-"+numCss);
		utils.cambiarClase("#col"+numCol,"class"+numCss);
	},

	//funcion que pasa los turnos por el atajo de teclado
	atajoInput: function(event)
	{
		if(event.keyCode==13)
		{
			var val  = $("#rapid").val();
			if(/^[0-6]{5}$/.test(val))
			{
				if(master.arrUs != null)
					master.arrUs = master.arrUs.splice(0,master.length);
				master.arrUs = new Array();
				for(i=0;i<val.length;i++)
					master.arrUs.push(val[i]);
				master.pasaTurno(false);
			}
			else
				utils.alert("No Valido");
		}
	}
}