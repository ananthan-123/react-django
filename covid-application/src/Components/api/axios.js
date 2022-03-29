import axios from 'axios';

//base url for the full application
//development backend will be run on the port 8000
export default axios.create({
    baseURL: 'http://localhost:8000'
});