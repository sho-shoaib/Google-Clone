import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchHeader from "../../components/SearchHeader";
import { getProviders } from "next-auth/react";
import { allResults, imageResults } from "../../Response";
import parse from "html-react-parser";
import SearchPagination from "../../components/SearchPagination";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Button } from "@chakra-ui/react";

const index = ({ providers, results, error }) => {
  const router = useRouter();
  const { term, searchType } = router.query;

  if (error.isErr) {
    return (
      <>
        <Head>
          <title>Error - Google Search Clone</title>
        </Head>

        <SearchHeader providers={providers} />

        <main className='w-full xl:max-w-full max-w-6xl xl:px-48 py-2 md:px-11 px-4 mx-auto'>
          <h1 className='text-2xl font-semibold mt-10'>An Error Occurred</h1>
          <p className='mt-2'>{error.error}</p>
          <Button
            className='mt-4'
            colorScheme='blue'
            onClick={() => router.push("/")}
          >
            Home
          </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{term} - Google Clone Search</title>
      </Head>

      <SearchHeader providers={providers} />

      {searchType === "images" ? (
        <>
          <main className='p-5 w-full flex flex-wrap gap-6'>
            {results.items.map((item, i) => {
              const {
                title,
                displayLink,
                link,
                image: { contextLink },
              } = item;
              return (
                <Link
                  key={i}
                  href={contextLink}
                  style={{ height: "180px" }}
                  className='grow mb-10 w-max group'
                >
                  <div className='h-full rounded-xl overflow-hidden bg-neutral-100 flex justify-center group-hover:shadow-lg'>
                    <img
                      src={link}
                      alt='image'
                      className='max-w-full max-h-full object-cover align-bottom'
                    />
                  </div>
                  <div className='w-full max-w-xs mt-0.5'>
                    <p className='truncate text-sm opacity-80 mb-0.5 group-hover:underline group-hover:underline-offset-2'>
                      {displayLink}
                    </p>
                    <h2 className='truncate text-sm opacity-95 group-hover:underline group-hover:underline-offset-2'>
                      {title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </main>
          <div className='md:-ml-48 xs:ml-0'>
            <SearchPagination />
          </div>
        </>
      ) : (
        <>
          <main className='w-full xl:max-w-full max-w-6xl xl:px-48 py-2 md:px-11 px-4 mx-auto'>
            <p className='text-sm opacity-80 mb-5'>
              About {results.searchInformation.formattedTotalResults} results (
              {results.searchInformation.formattedSearchTime} seconds)
            </p>
            <div className='flex flex-col gap-8 max-w-2xl'>
              {results.items.map((item, i) => {
                return (
                  <div key={i} className='flex flex-col items-start gap-1'>
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
          <div className='mt-12'>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const mockData = false;
  const startIndex = context.query.start || "1";
  let data, error;
  try {
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
    error = { isErr: false, error: "" };
  } catch (err) {
    error = { isErr: true, error: err };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
      results: data,
      error,
    },
  };
}

export default index;
