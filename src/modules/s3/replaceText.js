/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const AWS = require('aws-sdk');
const Response = require('../../utils/response'); //  to send responses
const messages = require('../../i18n/en.json');
const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } = require('../../../config');
// by default I am using english
AWS.config.update({ accessKeyId: IAM_USER_KEY, secretAccessKey: IAM_USER_SECRET, Bucket: BUCKET_NAME });
const s3 = new AWS.S3();

// #region modify s3 file
/**
 * @swagger
 *
 * /replaceText:
 *   post:
 *     tags:
 *       - S3
 *     description: Replace text of s3 files
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         required: true
 *         name: Replace Text Object
 *         schema:
 *           type: object
 *           properties:
 *             searchText:
 *               type: string
 *             replaceText:
 *               type: string
 *             folderPath:
 *               type: string
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - api_key: []
 */
router.post('/',
  [
    body('data.searchText').not().isEmpty().withMessage(messages.search_text), // here we generally get error messages using i18n
    body('data.replaceText').not().isEmpty().withMessage(messages.replace_text), // for testing I am just taking en.json as my default
    body('data.folderPath').not().isEmpty().withMessage(messages.path),
  ],
  async (req, res) => {
    try {
      const checkErrors = await Response.checkValidationErrors(req, res);
      if (!checkErrors) {
        const { searchText, replaceText, folderPath } = req.body;
        const params = {
          Bucket: BUCKET_NAME,
          Delimiter: '/',
          Prefix: `${folderPath}/`,
        };

        s3.listObjectsV2(params, (err, data) => {
          if (err) {
            return Response.sendError(err.message, 'modules -> s3 -> replaceText', '/', res);
          }

          if (data.Contents.length === 0) return Response.sendResponse(400, messages.emptyFiles, null, res);

          data.Contents.forEach((obj) => {
            console.log(obj.Key, '<<<file path');
          });

          return Response.sendResponse(200, messages.modified, null, res);
        });
      }
    } catch (e) {
      return Response.sendError(e, 'modules -> s3 -> replaceText', '/', res);
    }
  });
// #endregion

module.exports = router;
