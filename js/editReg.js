var rowId = 0;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const dbName = "petDB";
var request = indexedDB.open(dbName, 1);

document.getElementById("search-button").onclick = function () {
	var pos = document.getElementById("id-input").value;
	var request = indexedDB.open(dbName, 1);
	request.onsuccess = function(event) {
		var db = event.target.result;
		var tx = db.transaction("pets");
		var objectStore = tx.objectStore("pets");
		objectStore.getAll().onsuccess = function(event) {
	  		let pets = event.target.result;
	  		for(var i = 0, length1 = pets.length; i < length1; i++){
	  			let pet = pets[i];
	  		}
	  		
	  	};
	};
}
