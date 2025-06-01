"use client";

import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { Avatar } from "@radix-ui/react-avatar";

import { Settings } from "lucide-react";
import Link from "next/link";
import { getSession } from "next-auth/react";

const MobileNav = () => {
  const session = getSession();
  const paths = useNavigation();
  const { isActive } = useConversation();

  if (isActive) {
    return null;
  }

  return (
    <Card
      className={
        "fixed bottom-2 w-[calc(100%-20px)] flex items-center h-13 p-2 lg:hidden"
      }
    >
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {path.name}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <Settings size={25} />
          </li>
          <li className="flex">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={session?.user?.profilePic || "/user.png"}
                alt="User Avatar"
                className="rounded-full"
              />
            </Avatar>
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
