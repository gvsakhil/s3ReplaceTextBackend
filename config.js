const dotenv = require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

const result = dotenv;
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
// console.log(envs);
module.exports = envs;
