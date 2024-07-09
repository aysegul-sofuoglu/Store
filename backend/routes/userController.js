const express = require("express");
const User = require("../schemas/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    if (!data.email && !data.password)
      return res
        .json({ message: "Email ve şifre boş olamaz!", status: 400 })
        .status(400);

    const user = new User(data);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = await user.save();
    res.json(createdUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.email && !data.password)
      return res
        .json({ message: "Email ve şifre boş olamaz!", status: 400 })
        .status(400);

    const user = await User.findOne({ email: data.email });
    if (!user)
      return res
        .json({ message: "Kullanıcı bulunamadı!", status: 404 })
        .status(404);

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      return next(
        res
          .json({ message: "Şifre veya email hatalı!", status: 400 })
          .status(400)
      );
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, {expiresIn: '1h',});
    res.header("token", token);

    return res.status(200).json({
      data: {
        message: "Giriş başarılı",
        access_token: token,
        },
        status: 200,
      });
  } catch (error) {
    res
      .json({
        message: error.message,
        status: 500,
      })
      .status(500);
  }
});

module.exports = router;
