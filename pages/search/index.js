import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchHeader from "../../components/SearchHeader";
import { getProviders } from "next-auth/react";
import { allResults, imageResults } from "../../Response";

const index = ({ providers, results }) => {
  const router = useRouter();
  const { term } = router.query;
  console.log(results);

  return (
    <>
      <Head>
        <title>{term} - Google Clone Search</title>
      </Head>

      <SearchHeader providers={providers} />
    </>
  );
};

export async function getServerSideProps(context) {
  const mockData = process.env.MOCK_DATA;
  let data;
  if (!mockData) {
    data = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${
        process.env.SEARCH_API_KEY
      }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
        context.query.searchType && "&searchType=image"
      }`
    ).then((res) => res.json());
  } else {
    if (context.query.searchType === "images") {
      data = imageResults;
    } else {
      data = allResults;
    }
  }
  const providers = await getProviders();

  return {
    props: {
      providers,
      results: data,
    },
  };
}

export default index;
