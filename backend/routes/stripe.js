const router = require("express").Router();
const key = process.env.STRIPE_KEY;
const stripe = require("stripe", key);

router.post("/payment", async (req, res) => {
  try {
    const payment = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
