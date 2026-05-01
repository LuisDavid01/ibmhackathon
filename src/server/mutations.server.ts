import { auth } from "@/lib/auth";
import type { ServerFNResponse, UserInsert } from "@/types";
import {
    getRequest,
} from '@tanstack/react-start/server'

export const MUTATIONS = {

    async function (data: UserInsert): Promise<ServerFNResponse>{
        const req = getRequest()

        const newUser = await auth.api.createUser({
            body: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        })
        if (!newUser) {
            return {
                success: false,
                message: "Error creating user",
            }
        }

        return {
            success: true,
            message: "User created successfully",
        }   
    }

}