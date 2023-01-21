import { useSession } from "next-auth/react";
import React from "react";
import User from "./User";

const Header = ({ providers }) => {
  const { data: session } = useSession();

  return (
    <header className='flex justify-between items-center p-4 [&>*]:text-sm'>
      <div className='flex gap-6'>
        <a href='https://about.google/' className='link'>
          About
        </a>
        <a href='https://store.google.com/' className='link'>
          Store
        </a>
      </div>
      <div className='flex items-center gap-6'>
        <a href='https://mail.google.com/' className='link'>
          Gmail
        </a>
        <User providers={providers} callbackUrl={"/"} />
      </div>
    </header>
  );
};

export default Header;
