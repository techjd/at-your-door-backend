import asyncHandler from '../middleware/async.js';
import Orders from '../models/ordersModel.js';
import Users from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc CREATE A NEW ORDER
// @route GET /api/orders/createAOrder
// @access Private
const createNewOrder = asyncHandler(async (req, res) => {
  console.log(req.user.id);

  const {
    shopId,
    orderMode,
    orderedItems,
    shippingAddress,
    totalPrice,
  } = req.body;

  console.log(shopId);
  console.log(typeof JSON.parse(orderedItems));
  const inputThis = JSON.parse(orderedItems);
  const order = new Orders({
    user: req.user.id,
    shopId,
    orderMode,
    orderedItems: inputThis,
    shippingAddress,
    totalPrice,
  });

  const createOrder = await order.save();

  res.status(201).json({ msg: createOrder._id });
});

// @desc CREATE A NEW ORDER BY UDHAAR METHOD
// @route GET /api/orders/createAOrder/udhaar
// @access Private
const orderByUdhaar = asyncHandler(async (req, res) => {
  const {
    shopId,
    orderMode,
    orderedItems,
    shippingAddress,
    totalPrice,
  } = req.body;

  console.log(shopId);
  console.log(typeof JSON.parse(orderedItems));
  const inputThis = JSON.parse(orderedItems);

  const price = await Users.findById(req.user.id);
  const currentCredit = price.credit;

  if (totalPrice > currentCredit) {
    res.status(200).json({
      msg:
        'You Dont have enough credits in your account. Please Pay Past Bills',
    });
  } else {
    const order = new Orders({
      user: req.user.id,
      shopId,
      orderMode,
      orderedItems: inputThis,
      shippingAddress,
      totalPrice,
    });

    const createOrder = await order.save();

    const updatedCredit = currentCredit - totalPrice;
    price.credit = updatedCredit;

    await price.save();

    res.status(201).json({ msg: createOrder._id });
  }
});

// @desc CREATE A NEW ORDER BY COD METHOD
// @route GET /api/orders/createAOrder/codd
// @access Private
const orderByCod = asyncHandler(async (req, res) => {
  const {
    shopId,
    orderMode,
    orderedItems,
    shippingAddress,
    totalPrice,
  } = req.body;

  console.log(shopId);
  console.log(typeof JSON.parse(orderedItems));
  const inputThis = JSON.parse(orderedItems);
  const order = new Orders({
    user: req.user.id,
    shopId,
    orderMode,
    orderedItems: inputThis,
    shippingAddress,
    totalPrice,
  });

  const createOrder = await order.save();

  res.status(201).json({ msg: createOrder._id });
});

// @desc Update Paid value to true
// @route PUT api/orders/update/:orderid
// @access Private
const updateValue = asyncHandler(async (req, res) => {
  const orderId = req.params.orderid;

  const order = await Orders.findById(orderId);
  console.log(order.isPaid);
  order.isPaid = true;

  await order.save();

  res.status(200).json({ msg: 'Order Successfully Placed' });
});

// @desc GET ALL ORDERS
// @route GET /api/orders/
// @access Private
const getOrdersOfUsers = asyncHandler(async (req, res) => {
  const getOrders = await Orders.find({ user: req.user.id })
    .sort('-createdAt')
    .populate('shopId');

  res.status(200).json(getOrders);
});

export {
  createNewOrder,
  getOrdersOfUsers,
  updateValue,
  orderByUdhaar,
  orderByCod,
};
