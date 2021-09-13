var rowId = 0;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const dbName = "petDB";
var request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
  console.log("Database error");
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("pets", { keyPath: "id" });
  objectStore.createIndex("petNameInput", "petNameInput", { unique: false });
};

var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
	var db = event.target.result;
	var tx = db.transaction("pets");
	var objectStore = tx.objectStore("pets");
	objectStore.getAll().onsuccess = function(event) {
	  console.log(event.target.result);
	  rowId = event.target.result.length;
	};
};

document.getElementById("create-button").onclick = function () {
	rowId += 1;

	let pet = {
		dateInput: document.getElementById("date-input").value,
		ownerName: document.getElementById("name-input").value,
		petName: document.getElementById("petName-input").value,
		microchip: document.getElementById("microchip-input").value,
		petSpecies: document.getElementById("petspecie-select").value,
		petSex:document.getElementById("petsex-select").value,
		petSize: document.getElementById("petsize-select").value,
		petDanger: document.getElementById("petdanger-select").value,
		petSterilized: document.getElementById("petsterilized-select").value,
		petNeighborhood: document.getElementById("petneighborhood-select").value
	}
	
	var request = indexedDB.open(dbName, 1);
 	request.onsuccess = function(event) {
    	var db = event.target.result;
    	var customerObjectStore = db.transaction("pets", "readwrite").objectStore("pets");
	    pet["id"] = rowId;
	    customerObjectStore.add(pet);
  	};

	let tr = document.createElement("tr");
	tr.setAttribute("id", "row-" + rowId);

	let tdId = document.createElement("td");
	tdId.innerHTML = rowId;
	tr.appendChild(tdId);

	Object.keys(pet).forEach((key) => {
		console.log(key);

		let td = document.createElement("td");
		td.innerHTML = pet[key];

		tr.appendChild(td);

	});

	document.getElementById("body-table").appendChild(tr);
};

 