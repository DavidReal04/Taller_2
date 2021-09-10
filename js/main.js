var flag=false;
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

	let petNeighborhood = document.getElementById("petneighborhood-select").value;
	document.cookie = "petNeighborhood=" + petNeighborhood;

	flag = true;
	/*let pet = {
		dateInput: dateInput,
		ownerName: ownerName,
		petName: petName,
		petSpecies: petSpecies,
		petSex: petSex,
		petSize: petSize,
		petDanger: petDanger,
		petSterilized: petSterilized,
		petNeigborhood: petNeigborhood
		
	}*/
};
	
if(flag==true){

	console.log("Entro al if");
	let pet = document.cookie;

	console.log(decodeURIComponent(pet));

	Object.keys(pet).forEach((key) => {
		console.log(key);
		let td = document.createElement("td");
		td.innerHTML = pet[key];
		tr.appendChild(td);
	});	
}

	
