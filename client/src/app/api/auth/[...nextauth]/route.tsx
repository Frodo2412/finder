import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const URL = process.env.RAILS_API_URL + '/users/login';
        const res = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email,
              password,
            },
          }),
          credentials: 'include',
        });
        const user = await res.json();
        if (res.ok && user && user.user) {
          return user.user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: 'supersecret',
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
