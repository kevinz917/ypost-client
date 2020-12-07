const dotenv = require("dotenv");
const PROD = process.env.PROD;
const Base = process.env.REACT_APP_BACKEND_URL;

export { PROD, Base };
