import axios from 'axios';

const newLocal = 'https://jsonplaceholder.typicode.com/';
const instance = axios.create({
    baseUrl: newLocal
});

export default instance;