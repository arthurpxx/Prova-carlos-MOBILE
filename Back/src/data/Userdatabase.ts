import { Product, Ticket, User } from "../types/User"
import connection from "./connection"

export default class UserDatabase{
    async signup (user: User): Promise <void>{
        await connection ('cine_users')
            .insert({
                id: user.getId(),
                name: user.getName(),
                password: user.getPassword(),
                email: user.getEmail(),
            })
    }

    async checkUsers (email: string): Promise<User | undefined> {
        const user = await connection ('cine_users')
            .where({email})
            .select('*')
        
        if (user.length > 0){
            const newUser = new User(user[0].id, user[0].email, user[0].name, user[0].password)

            return newUser
        } else {
            return undefined
        }
    }

    async buy_ticket(ticket:Ticket): Promise<void> {
        await connection ('buy_ticket').insert({
            ticketID:ticket.getTicketID(),
            userID:ticket.getuserID(),
            quantidade:ticket.getquantidade()
        })
    }

    async buy_product(products:Product[]): Promise<void> {
        const fieldsToInsert = products.map(product => ({productID:product.getTicketID(), userID:product.getuserID(), quantidade:product.getquantidade()}))
        await connection ('buy_products').insert(fieldsToInsert)
    }
}