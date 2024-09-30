import Order from "../models/Orders.js";
import User from "../models/Users.js";

// create
export const createOrder = async (req, res) => {
  console.log(req.body);
  const { userId, products, amount, address, phoneNumber } = req.body;
  if (!userId || !products || !amount || !address || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  } else if (products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  } else {
    const newOrder = new Order(req.body);

    try {
      const bonusAmount = (amount / 100) * 10;
      console.log("Calculated bonus:", bonusAmount);
      const savedOrder = await newOrder.save();

      // update the bonus of the byRefrenceCodeUser
      const findUser = await User.findById(userId);

      console.log(findUser);
      console.log("user jis ne order kia hai upar hai");

      if (findUser && findUser?.byRefrence) {
        const updateUserBouns = await User.findOne({
          refrenceCode: findUser?.byRefrence,
        });

        if (updateUserBouns) {
          updateUserBouns.bonus += bonusAmount;
          await updateUserBouns.save();
          console.log("Bonus updated successfully:", updateUserBouns);
        } else {
          console.log("No user found with the given reference code");
        }
      } else {
        console.log("User does not have a reference code");
      }

      res.status(200).json(savedOrder);
    } catch (error) {
      console.error("Error in the order creation flow:", error);
      res.status(500).json({ message: "An error occurred", error });
    }
  }
};

// update
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user orders
export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all orders
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get monthly income
export const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
