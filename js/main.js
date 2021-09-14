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

var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
	var db = event.target.result;
	var tx = db.transaction("pets");
	var objectStore = tx.objectStore("pets");
		objectStore.getAll().onsuccess = function(event) {
		//Keep table info on reload
		let pets = event.target.result;
		for(var i = 0, length1 = pets.length; i < length1; i++){
			let pet = pets[i];
			rowId=pet.id;
			delete pet.id;
			let tr = document.createElement("tr");
			Object.keys(pet).forEach((key) => {
				let td = document.createElement("td");
				td.innerHTML = pet[key];
				tr.appendChild(td);
			});
			document.getElementById("body-table").appendChild(tr);
		}
		
	};
	
};

	
// New Exceptions
class DateError extends Error {
  constructor(message) {
    super(message); 
    this.name = "DateError"; 
  }
}
class NameError extends Error {
  constructor(message) {
    super(message);
    this.name = "NameError";
  }
}
class PetNameError extends Error {
  constructor(message) {
    super(message);
    this.name = "PetNameError";
  }
}
//Add register to the list
document.getElementById("create-button").onclick = function () {
	try {
		if(document.getElementById("date-input").value == ""){
			throw new DateError("Ingrese Una Fecha de Registro");
		}else if (document.getElementById("name-input").value == "") {
			throw new NameError("Ingrese el Nombre de Propietario");
		}else if (document.getElementById("petName-input").value == "") {
			throw new PetNameError("Ingrese el Nombre de la Mascota");
		}

		rowId += 1;

		//Create object Pet
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
		
		//Add register to the database
		var request = indexedDB.open(dbName, 1);
	 	request.onsuccess = function(event) {
	    	var db = event.target.result;
	    	var customerObjectStore = db.transaction("pets", "readwrite").objectStore("pets");
		    pet["id"] = rowId;
		    customerObjectStore.add(pet);
	  };

	  //Add object to the list
		let tr = document.createElement("tr");

		Object.keys(pet).forEach((key) => {
			let td = document.createElement("td");
			td.innerHTML = pet[key];
			tr.appendChild(td);
		});
		document.getElementById("body-table").appendChild(tr);
	} catch(e) {
		alert(e.message);
	}

};
//Edit register
document.getElementById("edit-button").onclick = function(){
	window.open("edit.html", "Ciudadanos de 4 patas", "width=800,height=600,scrollbars=NO");
}

//List filters

document.getElementById("specie-check").onclick = function(){

	let specie = document.getElementById("specie-check");
	let canine = document.getElementById("specie-canine-check");
	let feline = document.getElementById("specie-feline-check");

	if(specie.checked==true){
		canine.disabled = false;	
		canine.checked = true;
		feline.disabled = false;
	}else if(specie.checked==false){
		canine.disabled = true;
		feline.disabled = true;
		canine.checked = false;
		feline.checked = false;
	}
	
}

document.getElementById("sex-check").onclick = function(){

	let sex = document.getElementById("sex-check");
	let male = document.getElementById("sex-male-check");
	let female = document.getElementById("sex-female-check");

	if(sex.checked==true){
		male.disabled = false;	
		male.checked = true;
		female.disabled = false;
	}else if(sex.checked==false){
		male.disabled = true;
		female.disabled = true;
		male.checked = false;
		female.checked = false;
	}
	
}

document.getElementById("size-check").onclick = function(){
	let size = document.getElementById("size-check");
	let mini = document.getElementById("size-mini-check");
	let small = document.getElementById("size-small-check");
	let medium = document.getElementById("size-medium-check");
	let big = document.getElementById("size-big-check");

	if(size.checked==true){
		mini.checked = true;
		mini.disabled = false;
		small.disabled = false;
		medium.disabled = false;
		big.disabled = false;
	}else if(size.checked==false){
		mini.disabled = true;
		small.disabled = true;
		medium.disabled = true;
		big.disabled = true;
		mini.checked = false;
		small.checked = false;
		medium.checked = false;
		big.checked = false;
	}
}

document.getElementById("dangerous-check").onclick = function () {
	let dangerous = document.getElementById("dangerous-check");
	let yes = document.getElementById("dangerous-yes-check");
	let no = document.getElementById("dangerous-no-check");

	if(dangerous.checked==true){
		yes.disabled = false;	
		yes.checked = true;
		no.disabled = false;
	}else if(dangerous.checked==false){
		yes.disabled = true;
		no.disabled = true;
		yes.checked = false;
		no.checked = false;
	}
}

document.getElementById("microchip-check").onclick = function () {
	let microchip = document.getElementById("microchip-check");
	let yes = document.getElementById("microchip-yes-check");
	let no = document.getElementById("microchip-no-check");

	if(microchip.checked==true){
		yes.disabled = false;	
		yes.checked = true;
		no.disabled = false;
	}else if(microchip.checked==false){
		yes.disabled = true;
		no.disabled = true;
		yes.checked = false;
		no.checked = false;
	}
}

document.getElementById("sterilized-check").onclick = function () {
	let sterilized = document.getElementById("sterilized-check");
	let yes = document.getElementById("sterilized-yes-check");
	let no = document.getElementById("sterilized-no-check");

	if(sterilized.checked==true){
		yes.disabled = false;	
		yes.checked = true;
		no.disabled = false;
	}else if(sterilized.checked==false){
		yes.disabled = true;
		no.disabled = true;
		yes.checked = false;
		no.checked = false;
	}
}

//Apply filters

document.getElementById("filter-button").onclick = function () {
	let specie = document.getElementById("specie-check").checked;
	let sex = document.getElementById("sex-check").checked;
	let size = document.getElementById("size-check").checked;
	let dangerous = document.getElementById("dangerous-check").checked;
	let microchip = document.getElementById("microchip-check").checked;
	let sterilized = document.getElementById("sterilized-check").checked;

	if (specie) {
		let canine = document.getElementById("specie-canine-check");
		let feline = document.getElementById("specie-feline-check");
		if (canine.checked) {
			filterBy("Canino");	
		}else if(feline.checked){
			filterBy("Felino");
		}
	}	

	if (sex) {
		let male = document.getElementById("sex-male-check");
		let female = document.getElementById("sex-female-check");
		if (male.checked) {
			filterBy("Macho");	
		}else if(female.checked){
			filterBy("Hembra");
		}
	}	

	if (size) {
		let mini = document.getElementById("size-mini-check");
		let small = document.getElementById("size-small-check");
		let medium = document.getElementById("size-medium-check");
		let big = document.getElementById("size-big-check");
		if (mini.checked) {
			filterBy("Miniatura");	
		}else if(small.checked){
			filterBy("Pequeño");
		}else if(medium.checked){
			filterBy("Mediano");
		}else if(big.checked){
			filterBy("Grande");
		}
	}	
}

function filterBy(buscar){

	document.querySelectorAll('.table tbody tr').forEach(function(e){
	  var encontro = false;
	  e.querySelectorAll('td').forEach(function(e){
	    if (e.innerHTML.indexOf(buscar)>=0){
	      encontro = true;
	    }
	  }); 
	  if (encontro){
	    e.style.display = '';
	  }else{
	    e.style.display = 'none';
	  }
	});

}
