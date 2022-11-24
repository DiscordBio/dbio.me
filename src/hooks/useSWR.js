import axios from 'axios';
import useSWR from 'swr';

export default function useSwr(url, refreshInterval = 512000) {
    axios.defaults.withCredentials = true;
    return useSWR(url, href => (
        axios.get(href, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(res => res.data).catch(res => res?.response?.data).catch(() => {})
    ), { refreshInterval });
};