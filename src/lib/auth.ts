import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
	baseURL: "http://localhost:3000",
	emailAndPassword: {
		enabled: true,
	},
    database: drizzleAdapter(db, {
        provider: "mysql", 
	}),
	plugins:[tanstackStartCookies(), admin()]

});