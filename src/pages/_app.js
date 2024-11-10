// pages/_app.js
import { SessionProvider } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css'; // Custom styles


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
