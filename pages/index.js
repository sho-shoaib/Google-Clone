import { getProviders } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import googleLogo from "../assets/google-logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useRef } from "react";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Home({ providers }) {
  const router = useRouter();
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef(null);
  const search = (e) => {
    e.preventDefault();
    const term = inputRef.current.value.trim();
    if (!term) {
      return;
    }
    router.push(`/search?term=${term}&searchType=`);
  };

  return (
    <>
      <Head>
        <title>Google Clone</title>
        <meta name='description' content='Google Clone by Shoaib Shaikh' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header providers={providers} />

      <main>
        <form
          onSubmit={search}
          className='w-full max-w-xl flex flex-col items-center mx-auto px-4'
        >
          <Image
            title='Google'
            className='px-10'
            src={googleLogo}
            width={350}
          />
          <div
            className={`flex items-center gap-3 rounded-full pl-3.5 border-2 w-full -mt-6 hover:shadow-md overflow-hidden ${
              inputActive && "shadow-md"
            }`}
            onClick={() => inputRef.current.focus()}
          >
            <AiOutlineSearch size={22} className='text-neutral-500' />
            <input
              ref={inputRef}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              type='text'
              className='w-full py-3 text-sm outline-none'
            />
            <GrClose
              onClick={() => (inputRef.current.value = "")}
              size={49}
              className='text-neutral-100 opacity-60 py-4 pr-3.5 '
            />
          </div>
          <div className='flex gap-4 mt-6'>
            <button type='submit' className='home-btn'>
              Google Search
            </button>
            <button className='home-btn'>I'm Feeling Lucky</button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
