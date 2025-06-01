"use client";

import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { Avatar } from "@radix-ui/react-avatar";
import { LogOut, LogOutIcon, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { getSession } from "next-auth/react";

const DesktopNav = () => {
  const session = getSession();
  const paths = useNavigation();
  return (
    <Card
      className={
        "hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4"
      }
    >
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4 cursor-pointer">
        <Settings className="w-7 h-7"  />
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={session?.user?.profilePic || "/user.png"}
            alt="User Avatar"
            className="rounded-full"
          />
        </Avatar>
        <span className="" onClick={(() => {
          signOut()
        })}><LogOut className="w-6 h-6"/></span>
      </div>
    </Card>
  );
};

export default DesktopNav;
