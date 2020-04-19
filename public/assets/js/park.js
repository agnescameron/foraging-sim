import { plants } from './lib/plants.js';

// constants
const numPlants = 100;

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
			console.log(`picked a ${$(this).data('plant').name}`)
		})
		$('#park').append(plantDiv)
	}
}

$(document).ready(function() {
	growPlants();
})
