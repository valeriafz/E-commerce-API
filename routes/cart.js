const Cart = require("../models/Product");
const {
  verifyAdmin,
  verifyToken,
  verifyAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

// create cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get user cart
router.get("/find/:userId", verifyAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get all carts
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update cart
router.put("/:id", verifyAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete cart
router.delete("/", verifyAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
