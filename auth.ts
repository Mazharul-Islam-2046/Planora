import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb, saltAndHashPassword } from "./lib/utils"
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        try {
            let user = null


        const { email, password } = await signInSchema.parseAsync(credentials)
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password as string)
 
        // logic to verify if the user exists
        user = await getUserFromDb(email as string, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
        }catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
      }, 
    }),],
})