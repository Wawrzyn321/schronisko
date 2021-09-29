import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './../global-styles/font.css';
import './../global-styles/main.css';

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
