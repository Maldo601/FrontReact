import axios from 'axios'


const HOME = 'http://localhost:8080/back/project/home';

class HomeService {

    getUsers(){
        return axios.get(HOME);
    }
}

export default new HomeService();