const express = require('express');
const router = express.Router();
const Stripe = require('stripe')('sk_test_51Piid8RxLNSlyexVQdZtIwsG8q9qWgxWA7Up90rNsmKGMWRP9mfoJaQxZYeFR7R5L8eqJBdoB9GPoY4FVm1WL5XM00FmhDEfjD');
router.post('/', async (req, res) => {
try {
const session = await Stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items: req.body.cartItems.map(item => {
return {
price_data: {
currency: "usd",
product_data: {
name: item.designation,
},
unit_amount: item.prix*100,
},
quantity: item.cartQuantity,
}
}),
success_url: `${process.env.CLIENT_URL}`,
cancel_url: `${process.env.CLIENT_URL}`,
})
res.json({ sessionId: session.id })
} catch (e) {
res.status(500).json({ error: e.message })
}
});
module.exports = router;