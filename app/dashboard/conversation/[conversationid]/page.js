"use client";
import ConversationContainer from "@/components/conversation/ConversationContainer";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import ChatSkeleton from "@/components/skeleton/ChatSkeleton";
import { useSelector } from "react-redux";

const Page = () => {
  const param = useParams();
  console.log("Conversation ID:", param.conversationid);
  const selectedConversationFriend = useSelector((state) => state.friends.selectedFriend || null);

  useEffect(() => {
    
  }, [param.conversationid]);
  
  return <ConversationContainer><Header userInfo={selectedConversationFriend}/><ChatSkeleton/><ChatInput/></ConversationContainer>;
};

export default Page;
