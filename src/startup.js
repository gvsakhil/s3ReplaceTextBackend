require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const log = require('node-file-logger');
const path = require('path');
const {
  PORT,
} = require('../config');
const swaggerDocument = require('../swagger.json');

app.use(express.static(path.join(__dirname, '/my-app/build')));

// logger
const options = {
  folderPath: './logs/',
  dateBasedFileNaming: true,
  fileNamePrefix: 'Logs_',
  fileNameSuffix: '',
  fileNameExtension: '.log',
  dateFormat: 'DD-MM-YYYY',
  timeFormat: 'HH:mm:ss.SSS',
  logLevel: 'debug',
  onlyFileLogging: true,
};

log.SetUserOptions(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.listen(PORT, () => { console.log(`Started at: ${process.env.PORT}, env: ${process.env.NODE_ENV}`); });
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes')); // Routes

module.exports = app;
