const { Router } = require("express");
const router = Router();

const { signInPost, signInGet, signUpPost } = require("../controllers/auth-routes");

router.route("/sign-in")
    .get(signInGet)
    .post(signInPost);

router.route("/sign-up")
    .post(signUpPost);

module.exports = router;