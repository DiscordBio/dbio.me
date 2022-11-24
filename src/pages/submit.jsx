import EditPage from "@/components/Global/EditPage";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Submit() {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            if (user.appId !== null) {
                router.push("/" + user.appId + "/edit");
            }
        }
    }, [user]);


    return <EditPage isSubmit />;
}