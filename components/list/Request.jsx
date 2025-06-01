import React, { useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check, Loader2, User, X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const Request = ({ senderInfo, onRequestHandled }) => {
  const [isAccept, setIsAccept] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const acceptRequest = async () => {
    try {
      setIsAccept(true);
      const res = await axios.post("/api/accept-friend-request",{senderId: senderInfo._id});
      if (res.data.success) {
        toast.success(res.data.message);
        onRequestHandled(senderInfo._id); // Notify parent component to remove request
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsAccept(false);
    }
  };

  const rejectRequest = async () => {
    try {
        setIsReject(true)
        const res = await axios.post('/api/reject-friend-request', senderInfo._id);
        if(res.data.success){
            toast.success(res.data.message);
            onRequestHandled(senderInfo._id); // Notify parent component to remove request
        }
        else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.error(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
    finally{
        setIsReject(false)
    }
  }

  return (
    <Card
      className={"w-full p-2 flex flex-row items-center justify-between gap-2"}
    >
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={senderInfo.profilePic} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate font-bold text-lg">{senderInfo.username}</h4>
          <p className="text-sm text-muted-foreground truncate">
            {senderInfo.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={acceptRequest}
          className={"cursor-pointer"}
        >
          {isAccept ? (
            <>
              <Loader2 className="h-5 w-5" />
            </>
          ) : (
            <Check />
          )}
        </Button>
        <Button size="icon" onClick={rejectRequest} className={"cursor-pointer"}>
            {isReject ? (
            <>
              <Loader2 className="h-5 w-5" />
            </>
          ) : (
            <X className="w-8 h-8" />
          )}
        </Button>
      </div>
    </Card>
  );
};

export default Request;
