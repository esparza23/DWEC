/* Libreria donde declararemos las variables de cofiguracion del programa */

var config = {
    //Si debug esta activo, se mostraran los mensajes por consola.
    debug : 1,

    //Nos indica si estamos jugando o no
    jugando: false,

    //numero de huecos a divinar
    numHuecos : 5,

    //numero de colores seleccionables
    numColores : 6,

    //numero de turnos en la partida actual
    turnos : null,

    //turno actual de la partida
    turnoActual : null,

    //saber si el turno se ha cogido desde teclado o no
    teclado : null
};