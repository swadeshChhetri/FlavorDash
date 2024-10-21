import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  /*The initialState should reflect the structure and data types
   you expect to manipulate with your actions and reducers.*/

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      //addItem is a function which takes two parimeters-> state and action.
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),

        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

//This line is exporting the actions property from the cartSlice, which contains all the action creators you defined in the reducers section of your slice. By exporting cartActions, you can then use it in other parts of your application to dispatch actions.

/*
Function Definition:

javascript
Copy code
addItem(state, action) {
This function takes two parameters: state, which represents the current state of the cart, and action, which contains information about the action being dispatched (including the new item to be added).
Extract New Item:

javascript
Copy code
const newItem = action.payload;
Here, we extract the payload from the action. This payload holds the data for the new item being added to the cart (like id, title, price, etc.).
Check for Existing Item:

javascript
Copy code
const existingItem = state.cartItems.find(
    (item) => item.id === newItem.id
);
This line checks if the item to be added already exists in the cart. It uses the find method to search through cartItems and compares the id of each item with the id of newItem.
Update Total Quantity:

javascript
Copy code
state.totalQuantity++;
Regardless of whether the item is new or already exists, we increment the totalQuantity to reflect that an item is being added.
Add New Item:

javascript
Copy code
if (!existingItem) {
    state.cartItems.push({
        id: newItem.id,
        title: newItem.title,
        image01: newItem.image01,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price,
    });
If existingItem is undefined (i.e., the item doesn’t already exist in the cart), we create a new item object with the relevant properties and add it to cartItems. The quantity is initialized to 1, and totalPrice is set to the price of the new item.
Update Existing Item:

javascript
Copy code
} else {
    existingItem.quantity++;
    existingItem.totalPrice =
        Number(existingItem.totalPrice) + Number(newItem.price);
}
If the item already exists in the cart, we increment its quantity by 1 and update its totalPrice by adding the price of the new item.
Calculate Total Amount:

javascript
Copy code
state.totalAmount = state.cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
);
Finally, we calculate the totalAmount by using the reduce method on cartItems. This sums up the total cost of all items in the cart, multiplying each item's price by its quantity.
Summary
In essence, this addItem function handles adding items to the cart by:

Checking if the item already exists.
Updating the total quantity.
Adding a new item or updating an existing one.
Calculating the total amount for the cart.
This approach ensures that your cart state is kept up-to-date and accurately reflects the items added by the user.
*/
