import { AuthorsProvider } from "../context/AuthorsContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthorsProvider>
      <Component {...pageProps} />
    </AuthorsProvider>
  );
}
