import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/application-controller";

class UserService {

    getUserBoard() {
        return axios.get(API_URL + 'USER', {headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'ADMIN', {headers: authHeader() });
    }
}

export default new UserService();