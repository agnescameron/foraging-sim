import { plants } from './lib/plants.js';

//evil global variable :o 
let bag = [];


//this function calculates the number
//of plants of a specified type in the bag

//assignment 3: replace this with
//a single-line arrow function
function countPlants(plantName) {
	let total = 0;

	for(let i=0; i<bag.length; i++){
		if(bag[i].name === plantName) total+=1
	}

	return total;
}

async function getPlantInfo(plant) {
	const requestString = plant.latinName.replace('/\s/', '_') // a regex! this replaces spaces with underscores
fetch('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/' + requestString)
.then((response) => {
	return response.text();
}).then((data) => {
	var infoDiv = $('div .shortdescription', $(data));
	console.log(plant, infoDiv[0].innerHTML)
	plant.info = infoDiv[0].innerHTML;
});
}

//this function 'picks' a plant from the 
//field and appends it to the bag
function pickPlant(plantDiv) {
	const plant = plantDiv.data('plant')
	bag.push(plant)

	//append the item to the bag div
	$('#bag-contents').append($('<div/>', {
			'class': 'bag-item'
		})
		.html('<b>' + plant.name + ':</b><br>' + plant.info))

	const total = countPlants(plant.name)
	console.log(`there are now ${total} ${plant.name} in the bag`)

	plantDiv.hide()
}

//this function randomly generates plants on the
//main 'field' at the start of the simulation
function growPlants(numPlants) {
	console.log('growing'+ numPlants+ 'plants')
	for(let i=0; i<numPlants; i++){
		const plant = plants[Math.floor(Math.random()*plants.length)]

		let plantDiv = $('<div/>', {
			'class': `plant ${plant.name}`
		})
		//this is the jquery .data() attribute
		.data('plant', plant)
		.html(plant.symbol)
		.css({'left': Math.random()*95 + '%', 'top': Math.random()*95 + '%', 'color': plant.color})
		//note: we *don't* want to use an arrow function here, it's a method on an object
		.click(function() {
			pickPlant($(this));
		})
		$('#park').append(plantDiv)
	}
}

//this code runs once the document has loaded
$(document).ready(function() {
	growPlants(100);

	plants.forEach(function(plant){
		getPlantInfo(plant)
	})

	window.setInterval(function(){ growPlants(10); }, 10000);

	//event listeners
	$('#bag').click(() => $('#bag-contents').show())
	$('#bag-contents').click(() => $('#bag-contents').hide())
})
