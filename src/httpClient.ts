import axios, { type AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string, token: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    client.interceptors.response.use(
        res => res,
        err => {
            console.error('API Error:', err.response?.data || err.message);
            throw err;
        }
    );

    return client;
}