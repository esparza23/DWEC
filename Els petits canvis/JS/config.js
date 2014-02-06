//Declaramos las variables "Globales" para el juego.
var numFicha = 0;
var colorDrag;
var xOr,yOr;
var tauler;
var minim;
var feliz;
var busca;
var porCas;
var porVerda;
var casTotal = 100;
var casPlenes;
var ficVerdes;
var ficBlaves;
var click;
var turno;
var infelices;
var dir;
var guanyat;


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