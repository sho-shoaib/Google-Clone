import React from "react";

const Footer = () => {
  return (
    <footer className='bg-neutral-100 p-4 absolute bottom-0 w-full flex justify-between items-center [&>*]:text-neutral-700'>
      <div className='flex gap-2'>
        <a
          className='link'
          href={"https://www.linkedin.com/in/shoaib-shaikh-658a62232/"}
          target={"_blank"}
        >
          Shoaib Shaikh
        </a>
      </div>

      <p className='text-center'>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
