// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';

export default function Home({}) {
  return 'main';
}

// export default function Home({ _data }) {
// return 'tu będzie strona główna, ale na razie idźcie testować backoffice';
// const [data, setData] = useState(_data);

// useEffect(() => {
//   (async () => {
//     try {
//       const response = await fetch('http://localhost:60045/api/settings');
//       setData(await response.json());
//     } catch (e) {
//       alert(e.message);
//     }
//   })();
// }, []);

// return (
//   <div className="container">
//     <Head>
//       <title>Create Next App</title>
//       <link rel="icon" href="/favicon.ico" />
//     </Head>

//     <main>{!data ? 'loading?' : JSON.stringify(data)}</main>

//     <Link href="/posts">LINK</Link>
//   </div>
// );
// }

export async function getServerSideProps() {
  // const db = await myDB.connect({
  //   host: process.env.DB_HOST,               z pliku .env
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  // })

  /*Note: In order to keep server-only secrets safe, Next.js replaces process.env.* with the correct values at build time. This means that process.env is not a standard JavaScript object, so you’re not able to use object destructuring. Environment variables must be referenced as e.g. process.env.NEXT_PUBLIC_PUBLISHABLE_KEY, not const { NEXT_PUBLIC_PUBLISHABLE_KEY } = process.env. */
  /*In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_. For example:

NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
This loads process.env.NEXT_PUBLIC_ANALYTICS_ID into the Node.js environment automatically, allowing you to use it anywhere in your code.  */

  //This inlining occurs at build time, so your various NEXT_PUBLIC_ envs need to be set when the project is built.

  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const _data = await res.json()

  // Pass data to the page via props
  return { props: { _data: 'HAHA LOADING' } };
}
