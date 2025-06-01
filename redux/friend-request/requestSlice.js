import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequests: [],
  selectedRequest: null,
};

const requestSlice = createSlice({
  name: "friendRequests",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
    removeFriendRequest: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (request) => request.senderId._id !== action.payload
      );
    }
  },
}); 
export const {
  getRequests,
  removeFriendRequest
} = requestSlice.actions;   
export default requestSlice.reducer;