var rowId = 0;
document.getElementById("create-button").onclick = function () {
	
	let dateInput = document.getElementById("date-input").value;
	document.cookie = "dateInput=" + dateInput;

	let ownerName = document.getElementById("name-input").value;
	document.cookie = "ownerName=" + ownerName;

	let petName = document.getElementById("petName-input").value;
	document.cookie = "petName=" + petName;

	let microchip = document.getElementById("microchip-input").value;
	document.cookie = "microchip=" + microchip;

	let petSpecies = document.getElementById("petspecie-select").value;
	document.cookie = "petSpecies=" + petSpecies;

	let petSex= document.getElementById("petsex-select").value;
	document.cookie = "petSex=" + petSex;

	let petSize = document.getElementById("petsize-select").value;
	document.cookie = "petSize=" + petSize;

	let petDanger = document.getElementById("petdanger-select").value;
	document.cookie = "petDanger=" + petDanger;

	let petSterilized = document.getElementById("petsterilized-select").value;
	document.cookie = "petSterilized=" + petSterilized;

	let petNeighborhood = document.getElementById("petneighborhood-select").value;
	document.cookie = "petNeighborhood=" + petNeighborhood;

	readPet();
	
};

function readPet () {
	let pet = {
		dateInput: getCookie("dateInput"),
		ownerName: getCookie("ownerName"),
		petName: getCookie("petName"),
		microchip: getCookie("microchip"),
		petSpecies: getCookie("petSpecies"),
		petSex: getCookie("petSex"),
		petSize: getCookie("petSize"),
		petDanger: getCookie("petDanger"),
		petSterilized: getCookie("petSterilized"),
		petNeighborhood: getCookie("petNeighborhood")
	}
	rowId += 1;

	let tr = document.createElement("tr");
	tr.setAttribute("id", "row-" + rowId);

	let tdId = document.createElement("td");
	tdId.innerHTML = rowId;
	tr.appendChild(tdId);
	
	Object.keys(pet).forEach((key) => {
		let td = document.createElement("td");
		td.innerHTML = pet[key];
		tr.appendChild(td);
	});
	let tdActions = document.createElement("td");
	document.getElementById("body-table").appendChild(tr);
}

//Función extraída de W3Schools
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
	}
	return null;
} 