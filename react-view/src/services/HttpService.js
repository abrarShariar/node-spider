const http = require('axios');
const api = 'http://localhost:8081/';

class HttpService{
    static getAllNews(){
        return http.get(api);
    }
}

export default HttpService;