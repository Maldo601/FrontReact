import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {
    // Enviamos un tren de parametros a insertar en base de datos. 
    login(email, password) 
    {
        return axios
            .post(API_URL + "authenticate", {
                email,
                password
            })
            /**  Recogemos en response el token para poder acceder al controlador
             *   protegido de back, ya que solo se puede acceder a los protegidos, con token. 
             */
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
            
    }
    logout() {
        localStorage.removeItem("user");
    }

    // Enviamos un tren de parametros a insertar en base de datos. 
    register(name, lastname, secondlastname, email, password) {
        return axios.post(API_URL + "register", {
            name, 
            lastname, 
            secondlastname, 
            email, 
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}
// eslint-disable-next-line
export default new AuthService();