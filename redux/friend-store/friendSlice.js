import { createSlice } from "@reduxjs/toolkit";
import { NextResponse } from "next/server";
const initialState = {
  friends: [],
  selectedFriend: null
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {           // set friends in sidebar
      state.friends = action.payload;
    },
    addFriend: (state, action) => {             // add new friend one at a time via friend request
      const friendExists = state.friends.some(
        (friend) => friend._id === action.payload._id
      );
      if (friendExists) {
        return NextResponse.json(
          {success: false, message: "Friend already exists" },
          { status: 400 }
        );
      }
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend._id !== action.payload
      );
    },
    
    setSelectedFriend: (state, action) => {
      state.selectedFriend = action.payload;
    },
  },
});

export const { setFriends, addFriend, removeFriend, setSelectedFriend } =
  friendsSlice.actions;

export default friendsSlice.reducer;
