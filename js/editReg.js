var rowId = 0;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const dbName = "petDB";

var request = indexedDB.open(dbName, 1);
//Conection whith indexedDB
request.onerror = function(event) {
  console.log("Database error");
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("pets", { keyPath: "id" });
  objectStore.createIndex("petNameInput", "petNameInput", { unique: false });
};

document.getElementById("search-button").onclick = function () {
	var pos = document.getElementById("id-input").value -1;
	var request = indexedDB.open(dbName, 1);
	request.onsuccess = function(event) {
		var db = event.target.result;
		var tx = db.transaction("pets");
		var objectStore = tx.objectStore("pets");
		objectStore.getAll().onsuccess = function(event) {
	  		let pets = event.target.result;
	  		let pet = pets[pos];

	  		let size = pet.petSize;
	  		let danger = pet.petDanger;
	  		let neighborhood = pet.petNeighborhood;

	  		document.getElementById("petsize-select").disabled = false;
	  		document.getElementById("petneighborhood-select").disabled = false;
	  		document.getElementById("petdanger-select").disabled = false;
	  		document.getElementById("refresh-button").disabled = false;

	  		document.getElementById("petsize-select").value = size;
	  		document.getElementById("petneighborhood-select").value = neighborhood;
	  		document.getElementById("petdanger-select").value = danger;

	  		document.getElementById("id-input").disabled = true;
	  		document.getElementById("search-button").disabled = true;
	  	};
	};
}

document.getElementById("refresh-button").onclick = function () {
	let size = document.getElementById("petsize-select").value;
	let neighborhood = document.getElementById("petneighborhood-select").value;
	let danger = document.getElementById("petdanger-select").value;
	var pos = document.getElementById("id-input").value-1;

	var request = indexedDB.open(dbName, 1);
	request.onsuccess = function(event) {
		var db = event.target.result;
		var objectStore = db.transaction("pets", "readwrite").objectStore("pets");
		objectStore.getAll().onsuccess = function (event) {
			let pets = event.target.result;
			let pet = pets[pos];
			pet.petSize = size;
			pet.petDanger = danger;
			pet.petNeighborhood = neighborhood;

			var requestUpdate = objectStore.put(pet);
			requestUpdate.onsuccess = function(event){
				alert("Registro Actualizado");
				window.opener.location.reload();
				window.close();
			}
		}	  	
	}
}
