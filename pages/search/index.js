import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchHeader from "../../components/SearchHeader";
import { getProviders } from "next-auth/react";

const index = ({ providers }) => {
  const router = useRouter();
  const { term } = router.query;

  return (
    <>
      <Head>
        <title>{term} - Google Clone Search</title>
      </Head>

      <SearchHeader providers={providers} />
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default index;
