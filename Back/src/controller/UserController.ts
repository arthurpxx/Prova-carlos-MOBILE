import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import UserDatabase from "../data/Userdatabase"
import { Ticket } from "../types/User"

export default class UserController {
    async signup(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body

            const token = await new UserBusiness().signup(name, email, password, new UserDatabase().checkUsers, new UserDatabase().signup)

            res.status(200).send({ message: 'Usuário criado!', token: token })
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body

            const token = await new UserBusiness().login(email, password, new UserDatabase().checkUsers)

            res.status(200).send({ token: token })
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async buy_ticket(req: Request, res: Response): Promise<void> {
        try {
            const token=req.headers.authorization as string
            const {ticketID,quantidade}=req.body
            await new UserBusiness().buy_ticket(token,ticketID,quantidade)
            res.status(200).send('Compra finalizada')
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async buy_product(req: Request, res: Response): Promise<void> {
        try {
            const token=req.headers.authorization as string
            const {products}=req.body

            await new UserBusiness().buy_product(token, products)
            res.status(200).send('Compra finalizada')
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}