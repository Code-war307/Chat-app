import { useMemo } from "react";
import { useParams } from "next/navigation";

export const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        return params?.conversationid
    },[params?.conversationid])

    //console.log("useConversation", conversationId);

    const isActive = useMemo(() => !!conversationId, [conversationId])

    return {
        isActive,
        conversationId
    }
};