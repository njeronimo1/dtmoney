import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://dtmoney-lilac.vercel.app//api',
});