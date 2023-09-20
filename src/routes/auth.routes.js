const { Router } = require("express");
const router = Router();

const { signInPost, signUpPost } = require("../controllers/auth-routes");
const wrapper = require("../err/wrapper");
const validateSchema = require("../middlewares/validate-data");
const { userBody } = require("../validations/authenticate-request-body");

router
  .route("/sign-in")
  .post(
    validateSchema("body", userBody), 
    wrapper(signInPost)
  );

router
  .route("/sign-up")
  .post(
    validateSchema("body", userBody), 
    wrapper(signUpPost)
  );

module.exports = router;