console.log('route is active')
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log("EJS TEST TRIGGERED");

  return res.render('sirius-main', {
    testValue: "EJS IS WORKING"
  });
});
module.exports = router;