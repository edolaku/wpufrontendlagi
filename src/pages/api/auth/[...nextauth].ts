import environtment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    secret: environtment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: { label: 'identifier', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(
                credentials: Record<"identifier" | "password", string> | undefined
            ): Promise<UserExtended | null> {
                console.log("👉 [authorize nextauth.ts] credentials:", credentials);
                const { identifier, password } = credentials as { identifier: string, password: string };
                const result = await authServices.login({
                    identifier,
                    password
                })

                const accessToken = result.data.data;

                const me = await authServices.getProfileWithToken(accessToken);
                const user = me.data.data;

                if (accessToken && result.status === 200 && user && me.status === 200) {
                    user.accessToken = accessToken;
                    // console.log("✅ [authorize nextauth.ts] user:", user);
                    return user
                } else {
                    console.log("❌ [authorize nextauth.ts] gagal login");
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
            // console.log("👉 [jwt nextauth.ts] before:", token, user);
            if (user) {
                token.user = user;
            }
            // console.log("✅ [jwt nextauth.ts] after:", token);
            return token;
        },
        async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
            // console.log("👉 [session nextauth.ts] before:", session);
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            // console.log("✅ [session nextauth.ts] after:", session);
            return session
        }
    },
});