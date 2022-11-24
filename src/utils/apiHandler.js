module.exports.request = async (path, method, data, accessToken = null) => {
    try {
        const API_URL = "https://www.dbio.me/api/v1";
        const url = `${API_URL}${path}`;

        const isLocalStorage = typeof localStorage !== 'undefined';

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + (isLocalStorage ? localStorage.getItem('access_token') : accessToken)
            },
            credentials: 'include',
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options).then(res => res.json()).catch(err => { throw err; });

        if (response.success) {
            return response;
        } else {
            return {
                success: false,
                message: response?.message || (response?.error || 'Something went wrong')
            }
        }
    } catch (error) {
        return { 
            success: false, 
            message: error?.message || 'Something went wrong',
        };
    }
}