import MovieData from "../data/movieData";
import UserDatabase from "../data/Userdatabase";
import { Authenticator } from "../services/authenticator";

export default class MoviesBusiness{
    async getmovies(token:string){
        if (!token) {
            throw new Error("Token não enviado");
            
        }
        const tokendata=new Authenticator().getTokenData(token)
        if (!tokendata) {
            throw new Error("Token expirado");
            
        }
        const movies=await new MovieData().getmoviedata()
        return movies
    }

    async getproducts(token:string) {
        if (!token) {
            throw new Error("Token não enviado");
            
        }
        const tokendata=new Authenticator().getTokenData(token)
        if (!tokendata) {
            throw new Error("Token expirado");
            
        }
        const products=await new MovieData().getproduct()
        return products
    }
}