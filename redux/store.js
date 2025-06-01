import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './friend-store/friendSlice.js'
import messageReducer from './message-store/messageSlice.js'
import requestReducer from './friend-request/requestSlice.js'
export const store = configureStore({
  reducer: {
    friends: friendReducer,
    messages: messageReducer,
    friendRequests: requestReducer
  },
}) 