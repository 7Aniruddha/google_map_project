const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const app = express()
const port = 3000;
const start_city = 'New Delhi';
const end_city = 'Lucknow';
const api_key = 'AIzaSyB5RgWeIPEgqbehm9BaGZeBHN5jxe-GR4M'; 

//var geocoder = require('geocoder');
 

app.get('/', (req, res) => {
	(async ()=>{
		// const response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=${api_key}', {method: 'POST'});
		const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${end_city}&origins=${start_city}&units=imperial&key=${api_key}`, {method: 'POST'});
		const data = await response.json();
		console.log(data)

		const response1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${start_city}&key=${api_key}`, {method: 'GET'});
		const data1 = await response1.json();
		const start_city_cood = data1.results[0].geometry.location;
		console.log(data1.results[0].geometry.location)

		const response2 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${end_city}&key=${api_key}`, {method: 'GET'});
		const data2 = await response2.json();
		const end_city_cood = data2.results[0].geometry.location;		
		console.log(data2.results[0].geometry.location)

		res.send({
			start_city: data.origin_addresses[0],
			start_city_coordinates: start_city_cood,
			
			end_city: data.destination_addresses[0],
			end_city_coordinates: end_city_cood,

			distance: `${data.rows[0].elements[0].distance.value/1000} km`		
		})
		return data;
	})();
	
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


