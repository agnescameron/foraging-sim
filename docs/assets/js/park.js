import { plants } from './lib/plants.js';

// constants
const numPlants = 100;

//evil global variable :o 
let bag = [];

//takes in an unsorted bag, creates a sorted
//object with the amount of each plant type

//QUESTION 3: replace for loops here with
//arrow functions
function countPlants(bag) {
	return bag.reduce((totals, plant) => {
		if(!totals[plant.name]) totals[plant.name] = {
			name: plant.name,
			total: 1
		}
		else totals[plant.name].total = totals[plant.name].total + 1;

		return totals;
	}, {});
}

function pickPlant(plantDiv) {
	const plant = plantDiv.data('plant')
	bag.push(plant)

	const totals = countPlants(bag)
	console.log(totals)

	//append the item to the bag div
	$('#bag-contents').append($('<div/>', {
			'class': 'bag-item'
		})
		.html(plant.name))

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
