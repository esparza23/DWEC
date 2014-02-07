//funcion que determina si una ficha es feliz en el 4 en raya(tiene una ficha abajo, o esta al final del tablero).
function feliz4Raya(x,y)
{
	if(!rangCorrecte(x+1,y) || tauler.caselles[x+1][y].tincFicha())
		return true;
	else 
		return false;
}

//Funcion que "busca" la felicidad en el 4 en raya, haciendola "caer" hasta que sea feliz
function busca4Raya(id)
{
	//Buscamos la posicion hasta donde caera.
	var inici = numero($("#"+id).parent().attr("id"));
	x = Math.floor(inici/10);
	y = inici%10;
	var a = x;
	for(a=x;((a+1)<tauler.files) && !tauler.caselles[a+1][y].tincFicha() ;a++);
	
	//borramos la ficha del sitio original, la creamos  en el nuevo sitio y miramos si hemos ganado.
	$("#"+id).remove();
	var f = tauler.treuFicha(x,y);
	f.crearFicha(a,y,$("#"+id).attr("id"),colorDrag);
    tauler.colocaFicha(a,y,f);
    var num = 0;
    for(d=0;! guanyat && d<dir[0].length;d++)
    {
    	if(miraCasilla(a,y,dir[0][d],dir[1][d],num,dir[0][d],dir[1][d]))
	    	mensajeFinal(a,y);
    }
    
}

//funcion que dada una posicion, y una direccion, determina si se ha ganado al 4 en raya.
function miraCasilla(l,m,sumaI,sumaJ,num,dirI,dirJ)
{
	if(num==3)
		return true;
	if(!rangCorrecte(l+sumaI,m+sumaJ))
		return false;
	if(tauler.caselles[l+sumaI][m+sumaJ].tincFicha() && tauler.caselles[l][m].tornaColorFicha() != tauler.caselles[l+sumaI][m+sumaJ].tornaColorFicha())
		return false;
	if(!tauler.caselles[l+sumaI][m+sumaJ].tincFicha())
		return false;
	else 
	{
		num++;
		return miraCasilla(l,m,sumaI+dirI,sumaJ+dirJ,num,dirI,dirJ);
	}
}

//Funcion que determina si una ficha es feliz en funcion de si tiene un minimo de vecinos iguales.
function felizIguales(a,b)
{
	var x,y;
	var cond = 0;
	x = i;
	y = j;
	cond = buscaIg(a,b);
	if(cond>=minim)
		return true;
	else return false;
}

//Funcion que recorre todas las casillas buscando una que cumpla con el minimo de vecinos iguales a la ficha que se va a mover.
function iguales(a,b)
{
	var x,y;
	for(l = 0;l < tauler.files; l++)
	{
		for(m = 0;m < tauler.columnes; m++)	
		{
			var cond = 0;
			if(!tauler.caselles[l][m].tincFicha())
			{
				cond = buscaIg(l,m);
			}
			if(cond>=minim)
				tauler.caselles[l][m].posarseDisp();
		}
	}
}

//Funcion que determina si una ficha es feliz en funcion de si tiene un minimo de vecinos distintos.
function felizContrario(a,b)
{
	var x,y;
	var cond = 0;
	x = i;
	y = j;
	cond = buscaDif(a,b);
	if(cond>=minim)
		return true;
	else return false;
}

//Funcion que recorre todas las casillas buscando una que cumpla con el minimo de vecinos distintos a la ficha que se va a mover.
function contrario(a,b)
{
	var x,y;
	for(l = 0;l < tauler.files; l++)
	{
		for(m = 0;m < tauler.columnes; m++)	
		{
			var cond = 0;
			if(!tauler.caselles[l][m].tincFicha())
			{
				cond = buscaDif(l,m);
			}
			if(cond>=minim)
				tauler.caselles[l][m].posarseDisp();
		}
	}
}

//Funcion que dada una posición [x][y], busca los vecinos que tiene esa casilla alrededor y que 
//sean diferentes a la ficha que se va a mover
function buscaDif(a,b)
{
	cond = 0;
	var x = a;
	var y = b;
	//Actualizamos el valor para mirar que no sea la casilla de la ficha que se va a mover.
	xAct=x-1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		//miramos que el rango no este fuera de la matriz
		if(rangCorrecte(xAct,yAct) )
		{	
			//Si no tiene ficha y es de color igual a la nuestra, sumamos un vecino.
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	return cond;
}

//Funcion que dada una posición [x][y], busca los vecinos que tiene esa casilla alrededor y que 
//sean iguales a la ficha que se va a mover
function buscaIg(a,b)
{
	cond = 0;
	var x = a;
	var y = b;
	//Actualizamos el valor para mirar que no sea la casilla de la ficha que se va a mover.
	xAct=x-1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		//miramos que el rango no este fuera de la matriz
		if(rangCorrecte(xAct,yAct) )
		{	
			//Si no tiene ficha y es de color igual a la nuestra, sumamos un vecino.
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,yAct))
		{
			if(tauler.caselles[xAct][yAct].tincFicha() && (tauler.caselles[xAct][yAct].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	return cond;
}


//Funcion que mira si unas coordenadas [x][y] existen en el tablero definido.
function rangCorrecte(x,y)
{
	return ((x>=0 && y >=0) && (x<tauler.columnes &&  y<tauler.files));
}

//Funcion que devuelve un entero con la parte numerica de un string.
function numero(cadena)
{

    var numero = "";
    for (i = 0; i < cadena.length; i++) {
        if (cadena.charAt(i) >= '0' && cadena.charAt(i) <= '9')
        {
            numero += cadena.charAt(i);
        }
    }
    return parseInt(numero);
}

//Funcion que gestiona el mensaje final
function mensajeFinal(a,y)
{
	if(click)
	{
		guanyat = true;
    	$("#mensajeFinal").removeClass('hidden');
    	var col;
    	if(tauler.caselles[a][y].tornaColorFicha()=="circleA")
    		col = "verd";
    	else 
    		col = "blau";
    	$("#mens").text("Ha guanyat l'equip "+col);


    	//Quitamos el evento click de las casillas.
    	for(l = 0;l < tauler.files; l++)
			for(m = 0;m < tauler.columnes; m++)	
				$("#casella"+l+m).unbind("click");
	}
	else
	{
    	$("#mensajeFinal").removeClass('hidden');
    	$("#mens").text("Enhorabuena, todos los ciudadanos son felices!");
	}
}