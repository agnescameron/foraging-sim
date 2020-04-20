import { plants } from './lib/plants.js';

// constants
const numPlants = 100;

//globals
let bag = [];

function pickPlant(plantDiv) {
	// console.log(`picked some ${plantDiv.data('plant').name}`)
	const plant = plantDiv.data('plant')
	bag.push(plant)
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
