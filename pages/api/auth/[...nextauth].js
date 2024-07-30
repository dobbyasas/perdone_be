import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  database: process.env.DATABASE_URL,
})