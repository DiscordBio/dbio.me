import Button from "@/components/Global/Button";
import { useRouter } from "next/router";

export default function Error({ statusCode }) {
    const Router = useRouter();
    return <div className="flex flex-col items-center justify-center py-56">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-white">{statusCode}</h1>
        <p className="text-2xl text-gray-500 dark:text-gray-500">{"Something went wrong..."}</p>
        <Button variant="default" className="mt-4" onClick={() => Router.back()}>
            {"Go back"}
        </Button>
    </div>;
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
}