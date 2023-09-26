const { Router } = require("express");
const router = Router();

const { signInPost, signUpPost, createAdmin } = require("../controllers/auth-routes");
const { userBody } = require("../validations/authenticate-request-body");
const wrapper = require("../err/wrapper");

const validateSchema = require("../middlewares/validate-data");
const isAuthenticated = require("../middlewares/is-authenticated");
const isAdmin = require("../middlewares/is-admin");

router
  .route("/sign-in")
  .post(
    validateSchema("body", userBody), 
    signInPost
  );

router
  .route("/sign-up")
  .post(
    validateSchema("body", userBody), 
    signUpPost
  );

router
  .route("/sign-up-admin")
  .post(
    isAuthenticated,
    isAdmin,
    validateSchema("body", userBody), 
    wrapper(createAdmin)
  );

module.exports = router;