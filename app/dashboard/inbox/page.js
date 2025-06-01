"use client";
import ConversationFallback from "@/components/conversation/ConversationFallback";
import ItemList from "@/components/itemList/ItemList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, removeFriendRequest } from "@/redux/friend-request/requestSlice";
import { Divide, Loader } from "lucide-react";
import Request from "@/components/list/Request";

const InboxPage = () => {
  const [isRequestsLoading, setIsRequestsLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getFriendRequests = async () => {
      setIsRequestsLoading(true);
      try {
        const response = await axios.get("/api/getFriendRequest");
        if (response.data.success) {
          dispatch(getRequests(response.data.data));
        } else {
          console.error(
            "Failed to fetch friend requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
      finally {
        setIsRequestsLoading(false);
      }
    };
    getFriendRequests();
  },[dispatch]);

  const  friendRequests  = useSelector((state) => state.friendRequests.friendRequests);

  const handleRequestHandled = (senderId) => {
    dispatch(removeFriendRequest(senderId));
  }

  return (
    <>
      <ItemList title="Inbox">{
        isRequestsLoading ? (
          <Loader className="animate-spin h-8 w-8" />
        ) : (
          friendRequests.length > 0 ? (
            friendRequests.map((req) => {
              
              return (
                <Request
                  key={req.receiverId}
                  senderInfo = {req.senderId}
                  onRequestHandled={handleRequestHandled}
                />
              );
            })
          ) : (
            <p className="w-full h-full flex items-center justify-center">No friend request found</p>
          )
        )
        }</ItemList>
      <ConversationFallback />
    </>
  );
};

export default InboxPage;
