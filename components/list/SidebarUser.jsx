import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFriend } from "@/redux/friend-store/friendSlice";
import Link from "next/link";

const SidebarUser = ({ userInfo }) => {
  const dispatch = useDispatch(); // ✅ hook must be used at the top level
  const selectedFriend = useSelector(
    (state) => state.friends.selectedFriend || null
  );

  const handleSelectFriend = () => {
    dispatch(setSelectedFriend(userInfo)); // ✅ dispatch here
  };
  return (
    <Link href={`/dashboard/conversation/${userInfo._id}`} className="w-full">
      <Card
        onClick={handleSelectFriend}
        className={`w-full p-2 flex flex-row items-center gap-2 hover:bg-cusGray rounded-lg ${selectedFriend?._id === userInfo._id ? "bg-cusGray" : ""}`}
      >
        <div className="flex items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={userInfo.profilePic} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate font-bold text-lg">{userInfo.username}</h4>
            <p className="text-sm text-muted-foreground truncate">
              {userInfo.bio || "No bio available"}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SidebarUser;
