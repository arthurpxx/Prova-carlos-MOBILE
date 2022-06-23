import UserDatabase from "../data/Userdatabase"
import { Authenticator } from "../services/authenticator"
import { HashManager } from "../services/HashManager"
import IdGenerator from "../services/idGenetarior"
import { Product, Ticket, User } from "../types/User"

export default class UserBusiness {
    async signup(
        name: string,
        email: string,
        password: string,
        checkEmail: (email: string) => Promise<User | undefined>,
        register: (user: User) => Promise<void>,
    ): Promise<string> {
        if (!name || !email || !password) {
            throw new Error('Preencha os campos obrigatórios (name, email e password).')
        }


        const checkUser = await checkEmail(email)
        if (checkUser) {
            throw new Error('Email já cadastrado!')
        }

        const id = new IdGenerator().generateId()

        const hashPassword = new HashManager().createHash(password)

        const newUser = new User(id, email, name, hashPassword)

        await register(newUser)

        const token = new Authenticator().generateToken({ id: newUser.getId() })

        return token
    }

    async login(
        email: string,
        password: string,
        checkEmail: (email: string) => Promise<User | undefined>): Promise<string> {
        if (!email || !password) {
            throw new Error('Preencha os campos obrigatórios (email e password)')
        }

        const user = await checkEmail(email)
        if (!user) {
            throw new Error('Email ou senha incorretos.')
        }

        const passwordIsCorrect = new HashManager().compareHash(password, user.getPassword())
        if (!passwordIsCorrect) {
            throw new Error('Email ou senha incorretos.')
        }

        const token = new Authenticator().generateToken({ id: user.getId() })

        return token
    }

    async buy_ticket(token: string, ticketID:string,quantidade:number): Promise<void> {
        if (!token) {
            throw new Error("Token não enviado");

        }
        const tokendata = new Authenticator().getTokenData(token)
        if (!tokendata) {
            throw new Error("Token expirado");

        }
        const ticket=new Ticket(ticketID,tokendata.id,quantidade)
        await new UserDatabase().buy_ticket(ticket)
    }

    async buy_product(token: string, products: any): Promise<void> {
        if (!token) {
            throw new Error("Token não enviado");

        }
        const tokendata = new Authenticator().getTokenData(token)
        if (!tokendata) {
            throw new Error("Token expirado");

        }

        const product: any = []

        products.map((prod: any) => {
            const pro= new Product(prod.productID,tokendata.id,prod.quantidade)
            product.push(pro)
        }) 

        await new UserDatabase().buy_product(product)
    }
}