function felizIguales()
{
	var x,y;
	var cond = 0;
	x = i;
	y = j;
	cond = buscaIg();
	if(cond>=minim)
		return true;
	else return false;
}
function iguales()
{
	var x,y;
	for(i = 0;i < tauler.files; i++)
	{
		for(j = 0;j < tauler.columnes; j++)	
		{
			var cond = 0;
			if(!tauler.caselles[i][j].tincFicha())
			{
				cond = buscaIg();
			}
			if(cond>=minim)
				tauler.caselles[i][j].posarseDisp();
		}
	}
}

function felizContrario()
{
	var x,y;
	var cond = 0;
	x = i;
	y = j;
	cond = buscaDif();
	if(cond>=minim)
		return true;
	else return false;
}

function contrario()
{
	var x,y;
	for(i = 0;i < tauler.files; i++)
	{
		for(j = 0;j < tauler.columnes; j++)	
		{
			var cond = 0;
			if(!tauler.caselles[i][j].tincFicha())
			{
				cond = buscaDif();
			}
			if(cond>=minim)
				tauler.caselles[i][j].posarseDisp();
		}
	}
}

function buscaDif()
{
	cond = 0;
	x = i;
	y = j;
	xAct=x-1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,y-1) )
		{	
			if(tauler.caselles[i-1][j-1].tincFicha() && (tauler.caselles[i-1][j-1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x-1,y))
		{
			if(tauler.caselles[i-1][j].tincFicha() && (tauler.caselles[i-1][j].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x-1,y+1))
		{
			if(tauler.caselles[i-1][j+1].tincFicha() && (tauler.caselles[i-1][j+1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x,y+1))
		{
			if(tauler.caselles[i][j+1].tincFicha() && (tauler.caselles[i][j+1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y+1))
		{
			if(tauler.caselles[i+1][j+1].tincFicha() && (tauler.caselles[i+1][j+1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y))
		{
			if(tauler.caselles[i+1][j].tincFicha() && (tauler.caselles[i+1][j].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y-1))
		{
			if(tauler.caselles[i+1][j-1].tincFicha() && (tauler.caselles[i+1][j-1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x,y-1))
		{
			if(tauler.caselles[i][j-1].tincFicha() && (tauler.caselles[i][j-1].tornaColorFicha()!=colorDrag ))
			cond++;
		}
	}
	return cond;
}

function buscaIg()
{
	cond = 0;
	x = i;
	y = j;
	xAct=x-1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(xAct,y-1) )
		{	
			if(tauler.caselles[i-1][j-1].tincFicha() && (tauler.caselles[i-1][j-1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x-1,y))
		{
			if(tauler.caselles[i-1][j].tincFicha() && (tauler.caselles[i-1][j].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x-1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x-1,y+1))
		{
			if(tauler.caselles[i-1][j+1].tincFicha() && (tauler.caselles[i-1][j+1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x,y+1))
		{
			if(tauler.caselles[i][j+1].tincFicha() && (tauler.caselles[i][j+1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y+1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y+1))
		{
			if(tauler.caselles[i+1][j+1].tincFicha() && (tauler.caselles[i+1][j+1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y))
		{
			if(tauler.caselles[i+1][j].tincFicha() && (tauler.caselles[i+1][j].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x+1;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x+1,y-1))
		{
			if(tauler.caselles[i+1][j-1].tincFicha() && (tauler.caselles[i+1][j-1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	xAct=x;
	yAct = y-1;
	if (!(xAct==xOr && yAct == yOr))
	{
		if(rangCorrecte(x,y-1))
		{
			if(tauler.caselles[i][j-1].tincFicha() && (tauler.caselles[i][j-1].tornaColorFicha()==colorDrag ))
			cond++;
		}
	}
	return cond;
}

function rangCorrecte(x,y)
{
	return ((x>=0 && y >=0) && (x<tauler.columnes &&  y<tauler.files));
}