import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:60045/api/settings");
        setData(await response.json());
      } catch (e) {
        alert(e.message);
      }
    })();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{!data ? "loading?" : JSON.stringify(data)}</main>

      <Link href="/posts">LINK</Link>
      <style jsx>{`
        * {
          background-color: teal;
        }
      `}</style>

      <style jsx global>{``}</style>
    </div>
  );
}
