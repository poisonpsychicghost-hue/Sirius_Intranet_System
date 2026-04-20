console.log('route is active')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sirius Main Working');
});

module.exports = router;