document.getElementById("create-button").onclick = function (argument) {
	

	let pet = {
		dateInput: document.getElementById("date-input").value,
		ownerInput: document.getElementById("owner-input").value,
		petNameInput: document.getElementById("petname-input").value,
		petSpeciesInput: document.getElementById("petspecies-select").value,
		petSizeInput: document.getElementById("petsize-select").value,
	}
	let ownerInput = document.getElementById("owner-input").value;
	document.cookie = "ownername="+ownerInput;
}
