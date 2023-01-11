import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Google Clone</title>
        <meta name='description' content='Google Clone by Shoaib Shaikh' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
    </>
  );
}
