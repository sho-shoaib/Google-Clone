import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const User = ({ providers }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div
        className='cursor-pointer rounded-full h-9 w-9 overflow-hidden'
        onClick={signOut}
      >
        <img
          src={session.user.image}
          alt='user-image'
          className='w-full h-full object-cover'
        />
      </div>
    );
  }

  return (
    <button
      className='bg-blue-500 text-white py-3 px-6 rounded-md'
      onClick={() => signIn(providers.google.id, { callbackUrl: "/" })}
    >
      Sign In
    </button>
  );
};

export default User;
