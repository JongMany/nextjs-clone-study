import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import cookie from 'cookie';
import {cookies} from 'next/headers';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          const authResponse = await fetch(
            `${process.env.AUTH_URL}/api/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: credentials.username,
                password: credentials.password,
              }),
            }
          );
          let setCookie = authResponse.headers.get('Set-Cookie');
          console.log('set-cookie', setCookie);

          if(setCookie) {
            const parsed = cookie.parse(setCookie);
            cookies().set('connect.sid', parsed['connect.sid'], parsed);
          }
          

          if (!authResponse.ok) {
            return null;
          }

          const user = await authResponse.json();
          console.log('user', user);
          return {
            email: user.id,
            name: user.nickname,
            image: user.image,
            ...user,
          };
        } catch (error) {
          console.error('로그인 에러', error);
        }
      },
    }),
  ],
});
