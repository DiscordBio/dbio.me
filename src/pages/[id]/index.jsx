import UserPage from "@/components/Global/User";
import withSession from "@/libraries/withSession";
import { request } from "@/utils/apiHandler"

export default function User({ data }) {
    return <UserPage data={data} />
}
export const getServerSideProps = withSession(async (ctx) => {
    try {
        const response = await request("/entity/" + ctx.query.id, "GET", null, ctx.req.session.get('access_token'));
        if (response.success && response.data) {
            return {
                props: {
                    data: response.data
                }
            };
        } else {
            return {
                notFound: true
            }
        }
    } catch (e) {

        return {
            notFound: true
        };
    }
});