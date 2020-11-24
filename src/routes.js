const express = require('express');

const router = express.Router();

// s3 replace text
const replaceText = require('./modules/s3/replaceText');

router.use('/replaceText/', replaceText);

module.exports = router;
