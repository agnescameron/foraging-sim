import { plants } from './lib/plants.js';

// constants
const numPlants = 100;
let basket = [];

function pickPlant(plantDiv) {
	console.log(`picked some ${plantDiv.data('plant').name}`)
	basket.push(plantDiv.data('plant'))
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
		.click(function() {
			pickPlant($(this));
		})
		$('#park').append(plantDiv)
	}
}

$(document).ready(function() {
	growPlants();
})
