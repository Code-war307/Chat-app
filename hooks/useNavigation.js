import { Inbox, MessageCircle, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(() => [
    {
      name: "Chat",
      href: "/dashboard/conversation",
      icon: <MessageCircle />,
      active: pathname.startsWith("/dashboard/conversation"),
    },
    {
      name: "Group",
      href: "/dashboard/group",
      icon: <Users />,
      active: pathname === "/dashboard/group",
    },
    {
      name : "Inbox",
      href: "/dashboard/inbox",
      icon: <Inbox />, 
      active: pathname === "/dashboard/inbox", 
    }
  ], [pathname]);

  return paths;
};
