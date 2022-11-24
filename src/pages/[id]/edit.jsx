import EditPage from "@/components/Global/EditPage";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Edit() {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (user !== null || user !== undefined) {
            if (user?.appId === null) {
                router.push("/submit");
            } else {
                if (user?.appId !== router.query.id) {
                    router.push("/" + user.appId + "/edit");
                }
            }
        }
    }, [user]);

    return <EditPage />;
}