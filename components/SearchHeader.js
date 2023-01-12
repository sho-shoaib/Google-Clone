import { FiSettings } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import googleLogo from "../assets/google-logo.png";
import User from "./User";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useEffect } from "react";
import useWindowSize from "./useWindowSize";
import { GoSearch } from "react-icons/go";

const SearchHeader = ({ providers }) => {
  const inputRef = useRef(null);
  const router = useRouter();
  const { term } = router.query;
  const [inputActive, setInputActive] = useState(false);
  const search = (e) => {
    e.preventDefault();
    const term = inputRef.current.value.trim();
    if (!term) {
      return;
    }
    router.push(`/search?term=${term}`);
  };
  const { width } = useWindowSize();

  useEffect(() => {
    inputRef.current.value = term;
  });

  if (width >= 800) {
    return (
      <header className='px-11 py-4'>
        <div className='flex items-center justify-between gap-8'>
          <form onSubmit={search} className='flex-1 flex items-center gap-10'>
            <Link href={"/"}>
              <Image alt='user-image' src={googleLogo} width={90} height={90} />
            </Link>
            <div
              className={`max-w-2xl flex items-center gap-3 rounded-full w-full hover:shadow-md border-2 overflow-hidden border-neutral-200 ${
                inputActive && "shadow-md "
              }`}
              onClick={() => inputRef.current.focus()}
            >
              <AiOutlineSearch size={44} className='opacity-60 py-3 pl-3.5' />
              <input
                ref={inputRef}
                onFocus={() => setInputActive(true)}
                onBlur={() => setInputActive(false)}
                type='text'
                className='w-full py-2 text-sm outline-none'
              />
              <GrClose
                onClick={() => (inputRef.current.value = "")}
                size={40}
                className='text-neutral-100 opacity-60 py-3'
              />
              <button type='submit'>
                <GoSearch
                  size={40}
                  className='text-blue-800 opacity-60 py-3 pr-3.5 '
                />
              </button>
            </div>
          </form>
          <div className='flex items-center gap-6'>
            <FiSettings size={21} className='opacity-60 cursor-pointer' />
            <CgMenuGridO size={22} className='opacity-60 cursor-pointer' />
            <User providers={providers} callbackUrl={`/search?term=${term}`} />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className='px-11 py-4'>
      <div className='flex items-center justify-between'>
        <Link href={"/"}>
          <Image alt='user-image' src={googleLogo} width={90} height={90} />
        </Link>
        <div className='flex items-center gap-6'>
          <FiSettings size={21} className='opacity-60 cursor-pointer' />
          <CgMenuGridO size={22} className='opacity-60 cursor-pointer' />
          <User providers={providers} callbackUrl={`/search?term=${term}`} />
        </div>
      </div>
      <form onSubmit={search} className='w-full flex items-center gap-10'>
        <div
          className={`flex items-center gap-3 rounded-full w-full hover:shadow-md border-2 overflow-hidden border-neutral-200 ${
            inputActive && "shadow-md "
          }`}
          onClick={() => inputRef.current.focus()}
        >
          <AiOutlineSearch size={44} className='opacity-60 py-3 pl-3.5' />
          <input
            ref={inputRef}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            type='text'
            className='w-full py-2 text-sm outline-none'
          />
          <GrClose
            onClick={() => (inputRef.current.value = "")}
            size={40}
            className='text-neutral-100 opacity-60 py-3 '
          />
          <button type='submit'>
            <GoSearch
              size={40}
              className='text-blue-800 opacity-60 py-3 pr-3.5 '
            />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchHeader;
