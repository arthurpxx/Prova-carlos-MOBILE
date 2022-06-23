export type authenticationData = {
    id: string
}


export class User {
    constructor(
        private id: string,
        private email: string,
        private name: string, 
        private password: string
    ){}

    getId () {return this.id}

    getEmail () {return this.email}

    getName () {return this.name}

    getPassword () {return this.password}

}

export class Ticket {
    constructor(
        private ticketID: string,
        private userID: string,
        private quantidade: number
    ){}

    getTicketID() {return this.ticketID}
    getuserID() {return this.userID}
    getquantidade() {return this.quantidade}
}

export class Product {
    constructor(
        private productID: string,
        private userID: string,
        private quantidade: number
    ){}

    getTicketID() {return this.productID}
    getuserID() {return this.userID}
    getquantidade() {return this.quantidade}
}