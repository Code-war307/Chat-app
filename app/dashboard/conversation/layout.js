"use client";
import ItemList from "@/components/itemList/ItemList";
import React, { useEffect, useState } from "react";
import AddFriend from "./_components/AddFriend";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/redux/friend-store/friendSlice";
import axios from "axios";
import { calSkeletonCount } from "@/hooks/calculateSkeletonCount";
import SidebarSkeleton from "@/components/skeleton/SidebarSkeleton";
import SidebarUser from "@/components/list/SidebarUser";

const ConversationLayout = ({ children }) => {
  const [skeletonCount, setSkeletonCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setIsLoading(true);
        setSkeletonCount(calSkeletonCount());
        const res = await axios.get("/api/user-friends");
        dispatch(setFriends(res.data.friends));
      } catch (error) {
        console.error("Error fetching friends:", error?.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFriends();
  }, [dispatch]);

  const friends = useSelector((state) => state.friends.friends || []);
  
  return (
    <>
      <ItemList title="Chat" action={<AddFriend/>} >
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => <SidebarSkeleton key={index} />)
          : friends.map((friend) => (
              <SidebarUser key={friend._id} userInfo={friend}/>
            ))
        }
      </ItemList>
        {children}
      
    </>
  );
};

export default ConversationLayout;
