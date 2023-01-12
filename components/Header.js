import React from "react";
import User from "./User";

const Header = ({ providers }) => {
  return (
    <header className='flex justify-between items-center p-4 [&>*]:text-sm'>
      <div className='flex gap-6'>
        <p className='link'>About</p>
        <p className='link'>Store</p>
      </div>
      <div className='flex items-center gap-6'>
        <p className='link'>Gmail</p>
        <p className='link'>Images</p>
        <User providers={providers} callbackUrl={"/"} />
      </div>
    </header>
  );
};

export default Header;
