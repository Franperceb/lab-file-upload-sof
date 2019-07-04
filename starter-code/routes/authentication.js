const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const cloudinary = require("../config/cloudinary");
router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",

  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/picture-add", (req, res) => {
  res.render("upload");
});

router.post("/picture-add");
module.exports = router;