var lavolta = {};
var part;

lavolta.indexedDB = {};
lavolta.indexedDB.db = null;

lavolta.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("La Volta", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = lavolta.indexedDB.onerror;

    if(db.objectStoreNames.contains("partidas")) {
      db.deleteObjectStore("partidas");
    }

    var store = db.createObjectStore("partidas",
      {keyPath: "tiempoInicio"});
  };

  request.onsuccess = function(e) {
    lavolta.indexedDB.db = e.target.result;
    //lavolta.indexedDB.getAllPartidasItems();
  };

  request.onerror = lavolta.indexedDB.onerror;
};


lavolta.indexedDB.addPartidas = function(nombre,info) {
  var db = lavolta.indexedDB.db;
  var trans = db.transaction(["partidas"], "readwrite");
  var store = trans.objectStore("partidas");
  var d = new Date();
  var request = store.put({
    "nombre": nombre,
    "info":info,
    "tiempoInicio":d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()
  });

  request.onsuccess = function(e) {
    // Re-render all the todo's
    //lavolta.indexedDB.getAllPartidasItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};

function renderPartidas(div,row) {
	$(document.createElement("li"))
	.append(
		$(document.createElement("span")).text(row.nombre)
			.css("cursor","pointer")
			.click(function(event) {
        $(".selecPartida").addClass("hidden");
        $(".okBorrar").addClass('hidden');
        $(".butGC").removeClass('disabled');
				if(div =="#partidasG")
					$("#tbGuardar").val(row.nombre);
				else
					$("#tbCargar").val(row.nombre);
				partida = row.info;
			})
		)
	.append(
		$(document.createElement("span"))
			.addClass('glyphicon glyphicon-remove-circle')
			.css("cursor","pointer")
			.css("margin-left","1%")
			.click(function(event) {
				$(".okBorrar").removeClass('hidden');
        $(".selecPartida").addClass("hidden");
        part = row.tiempoInicio;
        $(".butGC").addClass('disabled');
				//lavolta.indexedDB.deletePartidas(row.tiempoInicio)
			})
		)
	.appendTo(div);
}

lavolta.indexedDB.getAllPartidas = function(div) {
  $(div).empty();

  var db = lavolta.indexedDB.db;
  var trans = db.transaction(["partidas"], "readwrite");
  var store = trans.objectStore("partidas");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    renderPartidas(div,result.value);
    result.continue();
  };

  cursorRequest.onerror = lavolta.indexedDB.onerror;
};

lavolta.indexedDB.deletePartidas = function(id,div) {
  var db = lavolta.indexedDB.db;
  var trans = db.transaction(["partidas"], "readwrite");
  var store = trans.objectStore("partidas");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    lavolta.indexedDB.getAllPartidas(div);  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};



lavolta.indexedDB.getPartidas = function(partida) {

  var db = lavolta.indexedDB.db;
  var trans = db.transaction(["partidas"], "readwrite");
  var store = trans.objectStore("partidas");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    if(result.value.nombre == partida)
    	lavolta.indexedDB.deletePartidas(result.value.tiempoInicio,"partidasG");
    	//alert("Borrare " + partida);
    else
    	result.continue();
  };
  cursorRequest.onerror = lavolta.indexedDB.onerror;
};

function cogePartidas(div)
{
	lavolta.indexedDB.getAllPartidas(div);
}

function guardar(nombre,info) {
	comprueba(nombre),
  lavolta.indexedDB.addPartidas(nombre,info);
}

function init() {
  lavolta.indexedDB.open(); // open displays the data previously saved
}

function comprueba(partida)
{
	lavolta.indexedDB.getPartidas(partida);
}

function borra(div)
{
  lavolta.indexedDB.deletePartidas(part,div);
}
