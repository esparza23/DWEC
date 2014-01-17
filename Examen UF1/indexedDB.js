var ex_UF = {};
var part;

ex_UF.indexedDB = {};
ex_UF.indexedDB.db = null;

ex_UF.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("Examen UF1", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = ex_UF.indexedDB.onerror;

    if(db.objectStoreNames.contains("numeros")) {
      db.deleteObjectStore("numeros");
    }

    var store = db.createObjectStore("numeros",
      {keyPath: "tiempoInicio"});
  };

  request.onsuccess = function(e) {
    ex_UF.indexedDB.db = e.target.result;
  };

  request.onerror = ex_UF.indexedDB.onerror;
};

ex_UF.indexedDB.addNum = function(num) {
  var db = ex_UF.indexedDB.db;
  var trans = db.transaction(["numeros"], "readwrite");
  var store = trans.objectStore("numeros");
  var d = new Date();
  var request = store.put({
    "num": num,
    "tiempoInicio":d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()
  });

  request.onsuccess = function(e) {
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};


function guardar(num) {
  ex_UF.indexedDB.addNum(num);
}

function init() {
  ex_UF.indexedDB.open(); // open displays the data previously saved
}