import withSession from '@/libraries/withSession';

export default withSession(async function (req, res) {
    const { access_token } = req.query;

    if (access_token) {
        req.session.set('access_token', access_token);
        await req.session.save();
    }


    res.json({ status: 'ok' });
});