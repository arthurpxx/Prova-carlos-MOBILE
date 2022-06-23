import { JwtPayload, sign, verify } from "jsonwebtoken"
import dotenv from 'dotenv'
import { authenticationData } from "../types/User"

dotenv.config()

export class Authenticator {

    generateToken = (
        payload: authenticationData
    ) => {
        const token = sign(
            payload,
            process.env.JWT_SECRET as string,
            {expiresIn: process.env.JWT_EXPIRES as string}
        )

        return token;
    }


    getTokenData = (token: string) => {
        try {
            const tokenData = verify(
                token,
                process.env.JWT_SECRET as string
            ) as JwtPayload

            return {
                id:tokenData.id
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

}   