import axios from "axios";

class MoviesDataService {

    getAll(page = 0){
     
    console.log( axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`))
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`);
    }

    find(query, by="title", page=0){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
        );
    }

    get(id){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`
        );
    }

    getRatings(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
    }

}
export default new MoviesDataService();