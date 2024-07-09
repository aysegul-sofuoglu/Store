const express = require("express");
const verifiedToken = require("../middlewares/verifyToken");
const Product = require("../schemas/Product");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  const products = await Product.find();
  res.json({
    products: products,
  });
});


router.get("/get-mine", verifiedToken, async (req, res) => {
  const products = await Product.find({user: req.user._id});
  res.json({
    products: products,
  });
});




router.get("/get/:id", verifiedToken, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId, user: req.user._id });
  res.json(product);
});

router.post("/create", verifiedToken, async (req, res) => {
  req.body.user = req.user._id;
  const createdProduct = await (await Product.create(req.body)).save();
  res.json(createdProduct);
});

router.patch("/update/:id", verifiedToken, async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedProduct);
});

router.delete("/delete/:id", verifiedToken, async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findOneAndDelete({_id: productId, user: req.user._id,});
  res.json(deletedProduct);
});

module.exports = router;
