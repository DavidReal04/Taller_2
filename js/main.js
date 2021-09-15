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

		let specie = document.getElementById("petspecie-select").value;

		//Create object Pet
		let pet = {
			dateInput: document.getElementById("date-input").value,
			ownerName: document.getElementById("name-input").value,
			petName: document.getElementById("petName-input").value,
			microchip: document.getElementById("microchip-input").value,
			petSpecies: document.getElementById("petspecie-select").value,
			petSex: document.getElementById("petsex-select").value,
			petSize: document.getElementById("petsize-select").value,
			petDanger: document.getElementById("petdanger-select").value,
			petSterilized: document.getElementById("petsterilized-select").value,
			petNeighborhood: document.getElementById("petneighborhood-select").value,
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
	window.open("edit.html", "Ciudadanos de 4 patas", "width=800,height=350,scrollbars=NO");
}

//Modal Edit Microchip & Esterilized

var locModal = document.getElementById('locModal');
var btnclose = document.getElementById('edit-close');
var btnShow= document.getElementById('add-microchip-esterilize-button');


//Show Modal
btnShow.addEventListener('click', (e) => {
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";
    document.getElementById("edit-microchip-input").disabled = true;
    document.getElementById("edit-petsterilized-select").disabled = true;
    document.getElementById("edit-save-btn").disabled = true;

    document.getElementById("id-input").value = "";
    document.getElementById("id-input").disabled = false;
    document.getElementById("search-button").disabled = false;
});

//Hide Modal
btnclose.addEventListener('click', (e) => {
	locModal.style.display = "none";
  locModal.className="modal fade";
});

//Put info into Modal Form
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
	  		let microchip = pet.microchip;
	  		let sterilized = pet.petSterilized;

	  		if(pet.microchip=="" && pet.petSterilized!="Si"){
	  			document.getElementById("edit-microchip-input").value = microchip;
	  			document.getElementById("edit-petsterilized-select").value = sterilized;
	  			
	  			document.getElementById("edit-microchip-input").disabled = false;
	  			document.getElementById("edit-petsterilized-select").disabled = false;
	  			document.getElementById("edit-save-btn").disabled = false;

	  			document.getElementById("id-input").disabled = true;
	  			document.getElementById("search-button").disabled = true;
	  		}else if(pet.microchip=="" && pet.petSterilized=="Si"){
	  			document.getElementById("edit-microchip-input").value = microchip;
	  			document.getElementById("edit-petsterilized-select").value = sterilized;
	  			
	  			document.getElementById("edit-microchip-input").disabled = false;
	  			document.getElementById("edit-petsterilized-select").disabled = true;
	  			document.getElementById("edit-save-btn").disabled = false;

	  			document.getElementById("id-input").disabled = true;
	  			document.getElementById("search-button").disabled = true;
	  		}else if(pet.microchip!="" && pet.petSterilized!="Si"){
	  			document.getElementById("edit-microchip-input").value = microchip;
	  			document.getElementById("edit-petsterilized-select").value = sterilized;
	  			
	  			document.getElementById("edit-microchip-input").disabled = true;
	  			document.getElementById("edit-petsterilized-select").disabled = false;
	  			document.getElementById("edit-save-btn").disabled = false;

	  			document.getElementById("id-input").disabled = true;
	  			document.getElementById("search-button").disabled = true;
	  		}else{
	  			alert("Ingrese una mascota válida");
	  		}
	  	};
	};
}
//Update Microchip & Sterilized
document.getElementById("edit-save-btn").onclick = function () {
	let microchip = document.getElementById("edit-microchip-input").value;
	let sterilized = document.getElementById("edit-petsterilized-select").value;
	var pos = document.getElementById("id-input").value-1;

	var request = indexedDB.open(dbName, 1);
	request.onsuccess = function(event) {
		var db = event.target.result;
		var objectStore = db.transaction("pets", "readwrite").objectStore("pets");
		objectStore.getAll().onsuccess = function (event) {
			let pets = event.target.result;
			let pet = pets[pos];
			pet.microchip = microchip;
			pet.petSterilized = sterilized;

			var requestUpdate = objectStore.put(pet);
			requestUpdate.onsuccess = function(event){
				locModal.style.display = "none";
  			locModal.className="modal fade";
  			alert("Registro Actualizado");
  			window.location.reload();
			}
		}	  	
	}
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

	var request = indexedDB.open(dbName, 1);
	request.onsuccess = function(event) {
		var db = event.target.result;
		var tx = db.transaction("pets");
		var objectStore = tx.objectStore("pets");
			objectStore.getAll().onsuccess = function(event) {
			let pets = event.target.result;
			let petsFilter;
			let canine = document.getElementById("specie-canine-check");
			let feline = document.getElementById("specie-feline-check");
			let male = document.getElementById("sex-male-check");
			let female = document.getElementById("sex-female-check");
			let mini = document.getElementById("size-mini-check");
			let small = document.getElementById("size-small-check");
			let medium = document.getElementById("size-medium-check");
			let big = document.getElementById("size-big-check");
			let dangeryes = document.getElementById("dangerous-yes-check");
			let dangerno = document.getElementById("dangerous-no-check");
			let microyes = document.getElementById("microchip-yes-check");
			let microno = document.getElementById("microchip-no-check");
			let steryes = document.getElementById("sterilized-yes-check");
			let sterno = document.getElementById("sterilized-no-check");
			if(!specie && !sex && !size && !dangerous && !microchip && !sterilized){
				petsFilter = pets;
			}else if (specie && !sex && !size && !dangerous && !microchip && !sterilized) {
				if (canine.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino");	
				}else if(feline.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino");
				}
			}else	if (!specie && sex && !size && !dangerous && !microchip && !sterilized) {
				if (male.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho");
				}else if(female.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra");
				}
			}else if (!specie && !sex && size && !dangerous && !microchip && !sterilized) {
				if (mini.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura");
				}else if(small.checked){
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño");
				}else if(medium.checked){
					petsFilter = pets.filter(pet => pet.petSize == "Mediano");
				}else if(big.checked){
					petsFilter = pets.filter(pet => pet.petSize == "Grande");
				}
			}else if (!specie && !sex && !size && dangerous && !microchip && !sterilized) {
				if (dangeryes.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "Si");
				}else if (dangerno.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "No");
				}
			}else if (!specie && !sex && !size && !dangerous && microchip && !sterilized) {
				if (microyes.checked){
					petsFilter = pets.filter(pet => pet.microchip != "");
				}else if (microno.checked){
					petsFilter = pets.filter(pet => pet.microchip == "");
				}
			}else if (!specie && !sex && !size && !dangerous && !microchip && sterilized) {
				if (steryes.checked){
					petsFilter = pets.filter(pet => pet.petSterilized == "Si");
				}else if (sterno.checked){
					petsFilter = pets.filter(pet => pet.petSterilized == "No");
				}
			}else if (specie && sex && !size && !dangerous && !microchip && !sterilized) {
				if (canine.checked && male.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho");	
				}else if (canine.checked && female.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra");
				}else if(feline.checked && male.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho");
				}else if(feline.checked && female.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra");
				}
			}else if (specie && !sex && size && !dangerous && !microchip && !sterilized) {
				if (canine.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSize == "Miniatura");	
				}else if (canine.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSize == "Pequeño");
				}else if (canine.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSize == "Mediano");	
				}else if (canine.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSize == "Grande");
				}else if (feline.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSize == "Miniatura");	
				}else if (feline.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSize == "Pequeño");
				}else if (feline.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSize == "Mediano");	
				}else if (feline.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSize == "Grande");
				}
			}else if (specie && !sex && !size && dangerous && !microchip && !sterilized) {
				if (canine.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petDanger == "Si");	
				}else if (canine.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petDanger == "No");
				}else if(feline.checked && dangeryes.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petDanger == "Si");
				}else if(feline.checked && dangerno.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petDanger == "No");
				}
			}else if (specie && !sex && !size && !dangerous && microchip && !sterilized) {
				if (canine.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "");	
				}else if (canine.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "");
				}else if(feline.checked && microyes.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "");
				}else if(feline.checked && microno.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "");
				}
			}else if (specie && !sex && !size && !dangerous && !microchip && sterilized) {
				if (canine.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si");	
				}else if (canine.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No");
				}else if(feline.checked && steryes.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si");
				}else if(feline.checked && sterno.checked){
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No");
				}
			}else if (!specie && sex && size && !dangerous && !microchip && !sterilized) {
				if (male.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSize == "Miniatura");	
				}else if (male.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSize == "Pequeño");
				}else if (male.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSize == "Mediano");	
				}else if (male.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSize == "Grande");
				}else if (female.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSize == "Miniatura");	
				}else if (female.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSize == "Pequeño");
				}else if (female.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSize == "Mediano");	
				}else if (female.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSize == "Grande");
				}
			}else if (!specie && sex && !size && dangerous && !microchip && !sterilized) {
				if (male.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "Si");	
				}else if (male.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "No");
				}else if(female.checked && dangeryes.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "Si");
				}else if(female.checked && dangerno.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "No");
				}
			}else if (!specie && sex && !size && !dangerous && microchip && !sterilized) {
				if (male.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip != "");	
				}else if (male.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip == "");
				}else if(female.checked && microyes.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip != "");
				}else if(female.checked  && microno.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip == "");
				}
			}else if (!specie && sex && !size && !dangerous && !microchip && sterilized) {
				if (male.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "Si");	
				}else if (male.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "No");
				}else if(female.checked && steryes.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "Si");
				}else if(female.checked && sterno.checked){
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "No");
				}
			}else if (!specie && !sex && size && dangerous && !microchip && !sterilized) {
				if (mini.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.petDanger == "Si");
				}else if (small.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.petDanger == "Si");
				}else if (medium.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.petDanger == "Si");	
				}else if (big.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.petDanger == "Si");
				}else if (mini.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.petDanger == "No");	
				}else if (small.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.petDanger == "No");
				}else if (medium.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.petDanger == "No");	
				}else if (big.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.petDanger == "No");
				}
			}else if (!specie && !sex && size && !dangerous && microchip && !sterilized) {
				if (mini.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.microchip != "");
				}else if (small.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.microchip != "");
				}else if (medium.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.microchip != "");	
				}else if (big.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.microchip != "");
				}else if (mini.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.microchip == "");	
				}else if (small.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.microchip == "");
				}else if (medium.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.microchip == "");	
				}else if (big.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.microchip == "");
				}
			}else if (!specie && !sex && size && !dangerous && !microchip && sterilized) {
				if (mini.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.petSterilized == "Si");
				}else if (small.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.petSterilized == "Si");
				}else if (medium.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.petSterilized == "Si");	
				}else if (big.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.petSterilized == "Si");
				}else if (mini.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Miniatura" && pet.petSterilized == "No");	
				}else if (small.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Pequeño" && pet.petSterilized == "No");
				}else if (medium.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Mediano" && pet.petSterilized == "No");	
				}else if (big.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSize == "Grande" && pet.petSterilized == "No");
				}
			}else if (!specie && !sex && !size && dangerous && microchip && !sterilized) {
				if (dangeryes.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "");	
				}else if (dangerno.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "");
				}else if(dangeryes.checked && microno.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "");
				}else if(dangerno.checked && microno.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "");
				}
			}else if (!specie && !sex && !size && dangerous && !microchip && sterilized) {
				if (dangeryes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "Si");	
				}else if (dangeryes.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "No");
				}else if(dangerno.checked && steryes.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "Si");
				}else if(dangerno.checked && sterno.checked){
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "No");
				}
			}else if (!specie && !sex && !size && !dangerous && microchip && sterilized) {
				if (microyes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.microchip == "Si" && pet.petSterilized == "Si");	
				}else if (microno.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.microchip == "No" && pet.petSterilized == "No");
				}else if(microyes.checked && steryes.checked){
					petsFilter = pets.filter(pet => pet.microchip == "Si" && pet.petSterilized == "Si");
				}else if(microno.checked && sterno.checked){
					petsFilter = pets.filter(pet => pet.microchip == "No" && pet.petSterilized == "No");
				}
			}else if(specie && sex && size && !dangerous && !microchip && !sterilized){
				if (canine.checked && male.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSize == "Miniatura");	
				}else if (canine.checked && male.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSize == "Pequeño");
				}else if (canine.checked && male.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSize == "Mediano");	
				}else if (canine.checked && male.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSize == "Grande");
				}else if (feline.checked && female.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSize == "Miniatura");	
				}else if (feline.checked && female.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSize == "Pequeño");
				}else if (feline.checked && female.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSize == "Mediano");	
				}else if (feline.checked && female.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSize == "Grande");
				}else	if (canine.checked && female.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSize == "Miniatura");	
				}else if (canine.checked && female.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSize == "Pequeño");
				}else if (canine.checked && female.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSize == "Mediano");	
				}else if (canine.checked && female.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSize == "Grande");
				}else if (feline.checked && male.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSize == "Miniatura");	
				}else if (feline.checked && male.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSize == "Pequeño");
				}else if (feline.checked && male.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSize == "Mediano");	
				}else if (feline.checked && male.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSize == "Grande");
				}
			}else if(specie && sex && !size && dangerous && !microchip && !sterilized){
				if (canine.checked && male.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petDanger == "Si");	
				}else if (canine.checked && male.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petDanger == "No");
				}else if (feline.checked && female.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petDanger == "Si");	
				}else if (feline.checked && female.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petDanger == "No");
				}else if (canine.checked && female.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petDanger == "Si");	
				}else if (canine.checked && female.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petDanger == "No");
				}else if (feline.checked && male.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petDanger == "Si");	
				}else if (feline.checked && male.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petDanger == "No");
				}
			}else if(specie && sex && !size && !dangerous && microchip && !sterilized){
				if (canine.checked && male.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.microchip != "");	
				}else if (canine.checked && male.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.microchip == "");
				}else if (feline.checked && female.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.microchip != "");	
				}else if (feline.checked && female.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.microchip == "");
				}else if (canine.checked && female.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.microchip != "");	
				}else if (canine.checked && female.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.microchip == "");
				}else if (feline.checked && male.checked && microyes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.microchip != "");	
				}else if (feline.checked && male.checked && microno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.microchip == "");
				}
			}else if(specie && sex && !size && !dangerous && !microchip && sterilized){
				if (canine.checked && male.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSterilized == "Si");	
				}else if (canine.checked && male.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Macho" && pet.petSterilized == "No");
				}else if (feline.checked && female.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSterilized == "Si");	
				}else if (feline.checked && female.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Hembra" && pet.petSterilized == "No");
				}else if (canine.checked && female.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSterilized == "Si");	
				}else if (canine.checked && female.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSex == "Hembra" && pet.petSterilized == "No");
				}else if (feline.checked && male.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSterilized == "Si");	
				}else if (feline.checked && male.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSex == "Macho" && pet.petSterilized == "No");
				}
			}else if(specie && !sex && size && dangerous && !microchip && !sterilized){
				if (canine.checked && dangeryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "Si" && pet.petSize == "Miniatura");	
				}else if (canine.checked && dangeryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "Si" && pet.petSize == "Pequeño");
				}else if (canine.checked && dangeryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "Si" && pet.petSize == "Mediano");	
				}else if (canine.checked && dangeryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "Si" && pet.petSize == "Grande");
				}else if (feline.checked && dangerno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "No" && pet.petSize == "Miniatura");	
				}else if (feline.checked && dangerno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "No" && pet.petSize == "Pequeño");
				}else if (feline.checked && dangerno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "No" && pet.petSize == "Mediano");	
				}else if (feline.checked && dangerno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "No" && pet.petSize == "Grande");
				}else	if (canine.checked && dangerno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "No" && pet.petSize == "Miniatura");	
				}else if (canine.checked && dangerno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "No" && pet.petSize == "Pequeño");
				}else if (canine.checked && dangerno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "No" && pet.petSize == "Mediano");	
				}else if (canine.checked && dangerno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petdanger == "No" && pet.petSize == "Grande");
				}else if (feline.checked && dangeryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "Si" && pet.petSize == "Miniatura");	
				}else if (feline.checked && dangeryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "Si" && pet.petSize == "Pequeño");
				}else if (feline.checked && dangeryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "Si" && pet.petSize == "Mediano");	
				}else if (feline.checked && dangeryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petdanger == "Si" && pet.petSize == "Grande");
				}
			}else if(specie && !sex && size && !dangerous && microchip && !sterilized){
				if (canine.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (canine.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (canine.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (canine.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSize == "Grande");
				}else if (feline.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (feline.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (feline.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSize == "Mediano");	
				}else if (feline.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSize == "Grande");
				}else	if (canine.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (canine.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (canine.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSize == "Mediano");	
				}else if (canine.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSize == "Grande");
				}else if (feline.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (feline.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (feline.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (feline.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSize == "Grande");
				}
			}else if(specie && !sex && size && !dangerous && !microchip && sterilized){
				if (canine.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (canine.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (canine.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (canine.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}else if (feline.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (feline.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (feline.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (feline.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else	if (canine.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (canine.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (canine.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (canine.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else if (feline.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (feline.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (feline.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (feline.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}
			}else if(specie && !sex && !size && dangerous && microchip && !sterilized){
				if (canine.checked && microyes.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petDanger == "Si");	
				}else if (canine.checked && microyes.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petDanger == "No");
				}else if (feline.checked && microno.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petDanger == "Si");	
				}else if (feline.checked && microno.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petDanger == "No");
				}else if (canine.checked && microno.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petDanger == "Si");	
				}else if (canine.checked && microno.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petDanger == "No");
				}else if (feline.checked && microyes.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petDanger == "Si");	
				}else if (feline.checked && microyes.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petDanger == "No");
				}
			}else if(specie && !sex && !size && dangerous && !microchip && sterilized){
				if (canine.checked && steryes.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petDanger == "Si");	
				}else if (canine.checked && steryes.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "Si" && pet.petDanger == "No");
				}else if (feline.checked && sterno.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petDanger == "Si");	
				}else if (feline.checked && sterno.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "No" && pet.petDanger == "No");
				}else if (canine.checked && sterno.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petDanger == "Si");	
				}else if (canine.checked && sterno.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.petSterilized == "No" && pet.petDanger == "No");
				}else if (feline.checked && steryes.checked && dangeryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petDanger == "Si");	
				}else if (feline.checked && steryes.checked && dangerno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.petSterilized == "Si" && pet.petDanger == "No");
				}
			}else if(specie && !sex && !size && !dangerous && microchip && sterilized){
				if (canine.checked && microyes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSterilized == "Si");	
				}else if (canine.checked && microyes.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip != "" && pet.petSterilized == "No");
				}else if (feline.checked && microno.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSterilized == "Si");	
				}else if (feline.checked && microno.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip == "" && pet.petSterilized == "No");
				}else if (canine.checked && microno.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSterilized == "Si");	
				}else if (canine.checked && microno.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Canino" && pet.microchip == "" && pet.petSterilized == "No");
				}else if (feline.checked && microyes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSterilized == "Si");	
				}else if (feline.checked && microyes.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petSpecies == "Felino" && pet.microchip != "" && pet.petSterilized == "No");
				}
			}else if(!specie && sex && size && dangerous && !microchip && !sterilized){
				if (male.checked && dangeryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "Si" && pet.petSize == "Miniatura");	
				}else if (male.checked && dangeryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "Si" && pet.petSize == "Pequeño");
				}else if (male.checked && dangeryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "Si" && pet.petSize == "Mediano");	
				}else if (male.checked && dangeryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "Si" && pet.petSize == "Grande");
				}else if (female.checked && dangerno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "No" && pet.petSize == "Miniatura");	
				}else if (female.checked && dangerno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "No" && pet.petSize == "Pequeño");
				}else if (female.checked && dangerno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "No" && pet.petSize == "Mediano");	
				}else if (female.checked && dangerno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "No" && pet.petSize == "Grande");
				}else	if (male.checked && dangerno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "No" && pet.petSize == "Miniatura");	
				}else if (male.checked && dangerno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "No" && pet.petSize == "Pequeño");
				}else if (male.checked && dangerno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "No" && pet.petSize == "Mediano");	
				}else if (male.checked && dangerno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petDanger == "No" && pet.petSize == "Grande");
				}else if (female.checked && dangeryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "Si" && pet.petSize == "Miniatura");	
				}else if (female.checked && dangeryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "Si" && pet.petSize == "Pequeño");
				}else if (female.checked && dangeryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "Si" && pet.petSize == "Mediano");	
				}else if (female.checked && dangeryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petDanger == "Si" && pet.petSize == "Grande");
				}
			}else if(!specie && sex && size && !dangerous && microchip && !sterilized){
				if (male.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (male.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (male.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (male.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip != "" && pet.petSize == "Grande");
				}else if (female.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (female.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (female.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && petmicrochip == "" && pet.petSize == "Mediano");	
				}else if (female.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip == "" && pet.petSize == "Grande");
				}else	if (male.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (male.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (male.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip == "" && pet.petSize == "Mediano");	
				}else if (male.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.microchip == "" && pet.petSize == "Grande");
				}else if (female.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (female.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (female.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (female.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.microchip != "" && pet.petSize == "Grande");
				}
			}else if(!specie && sex && size && !dangerous && !microchip && sterilized){
				if (male.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (male.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (male.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (male.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}else if (female.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (female.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (female.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (female.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else	if (male.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (male.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (male.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (male.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Macho" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else if (female.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (female.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (female.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (female.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petSex == "Hembra" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}
			}else if(!specie && !sex && size && dangerous && microchip && !sterilized){
				if (dangeryes.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (dangeryes.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (dangeryes.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (dangeryes.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSize == "Grande");
				}else if (dangerno.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (dangerno.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (dangerno.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && petmicrochip == "" && pet.petSize == "Mediano");	
				}else if (dangerno.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "" && pet.petSize == "Grande");
				}else	if (dangeryes.checked && microno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSize == "Miniatura");	
				}else if (dangeryes.checked && microno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSize == "Pequeño");
				}else if (dangeryes.checked && microno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSize == "Mediano");	
				}else if (dangeryes.checked && microno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSize == "Grande");
				}else if (dangerno.checked && microyes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSize == "Miniatura");	
				}else if (dangerno.checked && microyes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSize == "Pequeño");
				}else if (dangerno.checked && microyes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSize == "Mediano");	
				}else if (dangerno.checked && microyes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSize == "Grande");
				}
			}else if(!specie && !sex && size && dangerous && !microchip && sterilized){
				if (dangeryes.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (dangeryes.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (dangeryes.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (dangeryes.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}else if (dangerno.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (dangerno.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (dangerno.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (dangerno.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else	if (dangeryes.checked && sterno.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "No" && pet.petSize == "Miniatura");	
				}else if (dangeryes.checked && sterno.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "No" && pet.petSize == "Pequeño");
				}else if (dangeryes.checked && sterno.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "No" && pet.petSize == "Mediano");	
				}else if (dangeryes.checked && sterno.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.petSterilized == "No" && pet.petSize == "Grande");
				}else if (dangerno.checked && steryes.checked && mini.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "Si" && pet.petSize == "Miniatura");	
				}else if (dangerno.checked && steryes.checked && small.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "Si" && pet.petSize == "Pequeño");
				}else if (dangerno.checked && steryes.checked && medium.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "Si" && pet.petSize == "Mediano");	
				}else if (dangerno.checked && steryes.checked && big.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.petSterilized == "Si" && pet.petSize == "Grande");
				}
			}else if (!specie && !sex && !size && dangerous && microchip && sterilized) {
				if (dangeryes.checked && microyes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSterilized == "Si");	
				}else if (dangeryes.checked && microyes.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip != "" && pet.petSterilized == "No");
				}else if (dangerno.checked && microno.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "" && pet.petSterilized == "Si");	
				}else if (dangerno.checked && microno.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip == "" && pet.petSterilized == "No");
				}else if (dangeryes.checked && microno.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSterilized == "Si");	
				}else if (dangeryes.checked && microno.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "Si" && pet.microchip == "" && pet.petSterilized == "No");
				}else if (dangerno.checked && microyes.checked && steryes.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSterilized == "Si");	
				}else if (dangerno.checked && microyes.checked && sterno.checked) {
					petsFilter = pets.filter(pet => pet.petDanger == "No" && pet.microchip != "" && pet.petSterilized == "No");
				}
			}

			var Table = document.getElementById("body-table");
			Table.innerHTML = "";

			for(var i = 0, length1 = petsFilter.length; i < length1; i++){
				let pet = petsFilter[i];
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

}
