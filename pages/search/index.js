import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchHeader from "../../components/SearchHeader";
import { getProviders } from "next-auth/react";
import { allResults, imageResults } from "../../Response";
import parse from "html-react-parser";
import SearchPagination from "../../components/SearchPagination";

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

      <main className='w-full xl:max-w-full max-w-6xl xl:px-48 py-2 md:px-11 px-4 mx-auto'>
        <p className='text-sm opacity-80 mb-5'>
          About {results.searchInformation.formattedTotalResults} results (
          {results.searchInformation.formattedSearchTime} seconds)
        </p>
        <div className='flex flex-col gap-8 max-w-2xl'>
          {results.items.map((item) => {
            return (
              <div className='flex flex-col items-start gap-1'>
                <a
                  href={item.formattedUrl}
                  className='flex flex-col max-w-xl group gap-1'
                >
                  <p className='text-sm truncate text-neutral-800'>
                    {item.formattedUrl}
                  </p>
                  <h2 className='text-blue-800 text-xl group-hover:underline '>
                    {item.title}
                  </h2>
                </a>
                <p className='text-sm text-neutral-700'>
                  {parse(item.htmlSnippet)}
                </p>
              </div>
            );
          })}
        </div>
        <SearchPagination />
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const mockData = true;
  const startIndex = context.query.start || "1";
  let data;
  if (!mockData) {
    data = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${
        process.env.SEARCH_API_KEY
      }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
        context.query.searchType && "&searchType=image"
      }&start=${startIndex}`
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
