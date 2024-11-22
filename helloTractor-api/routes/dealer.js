const ChildDealers = require('../models/ChildDealers');
const Dealer = require('../models/Dealer');
const user = require('../models/user');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Endpoint to create a main dealer and its child dealers
router.post('/dealers', async (req, res) => {
  try {
    const { name, location, number } = req.body;

    const dealer = new Dealer({
      name,
      location,
      number,
      childDealers: []
    });

    await dealer.save();

    // if (parentDealerId) {
    //   const parentDealer = await Dealer.findById(parentDealerId);
    //   parentDealer.childDealers.push(dealer._id);
    //   await parentDealer.save();
    // }

    res.status(201).json(dealer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/dealers/:dealerId/dealers', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const { dealerId } = req.params;

    const mechanic = new Dealer({ name, specialty, dealer: dealerId });
    await mechanic.save();

    const dealer = await Dealer.findById(dealerId);
    dealer.mechanics.push(mechanic._id);
    await dealer.save();

    // Notify users
    const users = await User.find();
    users.forEach(user => {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'New Mechanic Added',
        text: `A new mechanic named ${name} has been added to dealer ${dealer.name}.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error sending email to ${user.email}: ${error.message}`);
        } else {
          console.log(`Email sent to ${user.email}: ${info.response}`);
        }
      });
    });

    res.status(201).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/dealers-nearby', async (req, res) => {
  const { lat, lng } = req.query;
  const drivers = await Dealer.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 5000, // 5 km radius
      },
    },
  });
  res.send(drivers);
});

// Endpoint to get dealer details including its child dealers

// router.get('/dealers/:id', async (req, res) => {
//   try {
//     const dealer = await Dealer.findById(req.params.id).populate('childDealers');
//     if (!dealer) {
//       return res.status(404).json({ error: 'Dealer not found.' });
//     }
//     res.status(200).json(dealer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [drivers, setDrivers] = useState([]);
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (location.lat && location.lng) {
//       axios
//         .get(`http://localhost:5000/drivers-nearby?lat=${location.lat}&lng=${location.lng}`)
//         .then((response) => {
//           setDrivers(response.data);
//         });
//     }
//   }, [location]);

//   return (
//     <div>
//       <h1>Drivers Nearby</h1>
//       <ul>
//         {drivers.map((driver) => (
//           <li key={driver._id}>{driver.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

module.exports = router;