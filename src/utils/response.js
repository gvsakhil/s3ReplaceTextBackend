const log = require('node-file-logger');
const { validationResult } = require('express-validator');

module.exports = {
  sendResponse(statuscode, message, data, res) {
    return res.status(statuscode).send({
      status: statuscode,
      message,
      data,
      errors: null,
    });
  },

  permissionError(res) {
    return res.status(401).send({
      status: 401,
      message: 'You dont have permissions to perform this operation',
      data: null,
      errors: null,
    });
  },

  sendError(e, path, methodName, res) {
    // log errors with path, message and methodName for identifying logs easily
    log.Error(e.message, path, methodName);
    return res.status(500).send({
      status: 500,
      message: 'Sorry something went wrong',
      data: null,
      errors: null,
    });
  },

  // eslint-disable-next-line consistent-return
  checkValidationErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        status: 422,
        message: '',
        data: null,
        errors: errors.errors,
      });
    }
    return false;
  },
};
