import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import { compare } from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email);

        const user = users ? users[0] : null;

        if (user && (await compare(credentials.password, user.password))) {
          console.log("TEST1");
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // Return null to indicate invalid credentials
          console.log("TEST2");
          throw new Error('Invalid credentials');
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY
  }),
  secret: process.env.SECRET,
  
});