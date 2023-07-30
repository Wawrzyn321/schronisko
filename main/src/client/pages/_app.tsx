import React, { useState } from 'react';
import Head from 'next/head';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './../global-styles/font.css';
import './../global-styles/main.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const [img, setImg] = useState('img/krecik.png');
  const [pushedImg, setPushedImg] = useState('img/krecik.png');

  return (
    <main>
      <input value={img} onChange={(e) => setImg(e.target.value)} />
      <button onClick={() => setPushedImg(img)}>
        Set image from {pushedImg}
      </button>
      <img
        src={pushedImg}
        style={{
          width: '100px',
          height: '100px',
          border: '1px solid black',
          margin: '100px',
        }}
      />
      <Head>
        <title>
          Schronisko dla zwierząt Miejskiego Zakładu Usług Komunalnych w
          Sosnowcu
        </title>
        <meta
          name="description"
          content="Schronisko dla zwierząt Miejskiego Zakładu Usług Komunalnych w Sosnowcu"
        ></meta>
        <link rel="icon" type="image/png" href="/site/favicon.ico"></link>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
