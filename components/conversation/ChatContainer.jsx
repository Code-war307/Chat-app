import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/message-store/messageSlice";
import axios from "axios";
import toast from "react-hot-toast";
import ChatSkeleton from "../skeleton/ChatSkeleton";
import ChatFooter from "./ChatFooter";

const ChatContainer = () => {
  const [isMessageLoading, setIsMessageLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedFriend = useSelector(
    (state) => state.friends.selectedFriend || null
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedFriend || !selectedFriend._id) {
          console.log("No selected friend ID");
          return;
        }
        const res = await axios.get(`/api/get-messages/${selectedFriend._id}`);
        console.log("Messages fetched:", res.data.messages);

        dispatch(setMessages(res.data.messages));
        setIsMessageLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedFriend]);

  //const messages = useSelector((state) => state.messages.messages || []);

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <ChatSkeleton />
      </div>
      <ChatFooter />
    </div>
  );
};

export default ChatContainer;
