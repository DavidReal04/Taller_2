document.getElementById("create-button").onclick = function () {
	
	let dateInput = document.getElementById("date-input").value;
	document.cookie = "dateInput=" + dateInput;

	let ownerName = document.getElementById("name-input").value;
	document.cookie = "ownerName=" + ownerName;

	let petName = document.getElementById("petName-input").value;
	document.cookie = "petName=" + petName;

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

	let petNeigborhood = document.getElementById("petneigborhood-select").value;
	document.cookie = "petNeigborhood=" + petNeigborhood;
};
	
	
