const MedicalCenter = require("../../models/MedicalCenter");
//const fetch = require('cross-fetch'); //node-fetch

async function findCenter(req, res) {

  try {
    const rating = parseInt(req.query.rating);
    const price = parseInt(req.query.price);
    const services = req.query.services ? req.query.services.split(",") : [];
    const searchParam = req.query.searchParam ? req.query.searchParam : "";
    const distance = parseInt(req.query.distance);
    const address = req.query.address ? req.query.address : "";

    // Get the latitude and longitude coordinates of the user's input address using the Google Maps Geocoding API
    // API key obtained from Google Cloud

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    const lat = geocodeData.results[0].geometry.location.lat;
    const lng = geocodeData.results[0].geometry.location.lng;

    const query = {
      rating: { $gte: rating },
      price: { $lte: price },
      name: { $regex: new RegExp(searchParam, "i") }
    };

    if (services.length > 0) {
      query.services = { $in: services };
    }

    if (distance) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          // convert distance from km to meters
          $maxDistance: distance * 1000,
        },
      }
    }

    const centers = await MedicalCenter.find(query).exec();

    res.status(200).json(centers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  findCenter
};
