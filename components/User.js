import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const User = ({ providers, callbackUrl }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div
        className='cursor-pointer rounded-full h-8 w-8 overflow-hidden'
        onClick={signOut}
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt='user-image'
            title={session.user.name}
            className='w-full h-full object-cover'
          />
        ) : (
          <FaUserCircle size={32} />
        )}
      </div>
    );
  }

  return (
    <button
      className='bg-blue-500 text-sm text-white py-3 px-6 rounded-md'
      onClick={() => signIn(providers.google.id, { callbackUrl })}
    >
      Sign In
    </button>
  );
};

export default User;
