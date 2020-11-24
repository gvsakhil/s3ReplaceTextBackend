/* eslint-disable max-len */
/* eslint-disable consistent-return */
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const Response = require('../../utils/response'); //  to send responses
const messages = require('../../i18n/en.json'); // by default I am using english

// #region modify s3 file
/**
 * @swagger
 *
 * /bbuser:
 *   post:
 *     tags:
 *       - bbUser
 *     description: Create a BB user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         required: true
 *         name: bbUser
 *         schema:
 *           type: object
 *           properties:
 *             bbUserDetails:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 mobileNumber:
 *                   type: string
 *                 emailId:
 *                   type: string
 *                 password:
 *                   type: string
 *                 userRole:
 *                   type: string
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - api_key: []
 */
router.post('/',
  [
    body('searchText').not().isEmpty().withMessage(messages.search_text), // here we generally get error messages using i18n
    body('replaceText').not().isEmpty().withMessage(messages.replace_text), // for testing I am just taking en.json as my default
    body('path').not().isEmpty().withMessage(messages.path),
  ],
  async (req, res) => {
    try {
      const checkErrors = await Response.checkValidationErrors(req, res);
      if (!checkErrors) {
        
      }
    } catch (e) {
      return Response.sendError(e, 'modules -> s3 -> replaceText', '/', res);
    }
  });
// #endregion

module.exports = router;
