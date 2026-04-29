import cartModel from "./../models/cartModel.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ productId: itemId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        // (item) => item.productId === itemId
        (item) => item.productId.toString() === itemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId: itemId, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let cart = await cartModel.findOne({ userId });

    // ✅ CREATE CART IF NOT EXISTS
    if (!cart) {
      cart = new cartModel({
        userId,
        items: []
      });
      await cart.save();
    }

    let cartData = {};

    cart.items.forEach((item) => {
      cartData[item.productId] = item.quantity;
    });

    res.json({ success: true, cartData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// ✅ UPDATE CART
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.json({ success: false });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === itemId
    );

    if (itemIndex > -1) {
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    await cart.save();
    res.json({ success: true });

  } catch (error) {
    res.json({ success: false });
  }
};

// ✅ CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    await cartModel.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false });
  }
};