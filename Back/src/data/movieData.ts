import connection from "./connection";

export default class MovieData{
    async getmoviedata(){
        const movies=await connection('cine_movies')
        .select('*')
        return movies
    }

    async getproduct(){
        const products=await connection('cine_produts')
        .select('*')
        return products
    }
}