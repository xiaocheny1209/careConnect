// this file is a testing program
// you can find the latitude and longitude of an address

//const fetch = require('node-fetch');

async function geocodeAddress(address) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBTJzMyDVgEOqvO2IO0mrtlj45aidgfqbU`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
  
    // console.log('geocodeData:', geocodeData);
    // console.log('geocodeData.results:', geocodeData.results);
  
    const lat = geocodeData.results[0].geometry.location.lat;
    const lng = geocodeData.results[0].geometry.location.lng;
  
    console.log(`The latitude and longitude of ${address} are (${lat}, ${lng})`);
  }

  const address = 'Abu Dhabi Mall' // change this //'Saadiyat To Go Supermarket'
  geocodeAddress(address); 