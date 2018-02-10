const express = require('express');
const router =  express.Router();
const path = require('path');


router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/contact.html'))
});


module.exports = router; //all apps can use this app
