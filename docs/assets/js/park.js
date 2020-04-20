import { plants } from './lib/plants.js';

// constants
const numPlants = 100;

//evil global variable :o 
let bag = [];

//finds the number of each plant
//assignment 3: replace this with
//a single-line arrow function
function countPlants(plantName) {
	let total = 0;

	for(let i=0; i<bag.length; i++){
		if(bag[i].name === plantName) total+=1
	}

	return total;
}

function pickPlant(plantDiv) {
	const plant = plantDiv.data('plant')
	bag.push(plant)

	//append the item to the bag div
	$('#bag-contents').append($('<div/>', {
			'class': 'bag-item'
		})
		.html(plant.name))

	const total = countPlants(plant.name)
	console.log(`there are now ${total} ${plant.name} in the bag`)

	plantDiv.hide()
}

function growPlants() {
	for(let i=0; i<numPlants; i++){
		const plant = plants[Math.floor(Math.random()*plants.length)]

		let plantDiv = $('<div/>', {
			'class': `plant ${plant.name}`
		})
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

$(document).ready(function() {
	growPlants();
	$('#bag').click(() => $('#bag-contents').show())
	$('#bag-contents').click(() => $('#bag-contents').hide())
})
