import { Request, Response } from "express";
import MoviesBusiness from "../business/movieBusiness";

export default class MovieController {
    async getmovies(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const movies = await new MoviesBusiness().getmovies(token)
            res.status(200).send(movies)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async getproducts(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const products = await new MoviesBusiness().getproducts(token)
            res.status(200).send(products)
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}