import Image from "next/image";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import googleLogo from "../assets/google-logo.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const starts = [
  {
    index: "",
    page: 1,
  },
  {
    index: 11,
    page: 2,
  },
  {
    index: 21,
    page: 3,
  },
  {
    index: 31,
    page: 4,
  },
  {
    index: 41,
    page: 5,
  },
  {
    index: 51,
    page: 6,
  },
  {
    index: 61,
    page: 7,
  },
  {
    index: 71,
    page: 8,
  },
  {
    index: 81,
    page: 9,
  },
  {
    index: 91,
    page: 10,
  },
];

const SearchPagination = () => {
  const router = useRouter();
  const { term, searchType, start } = router.query;

  return (
    <div className='max-w-2xl my-8 flex flex-col items-center'>
      <div className='w-full flex gap-6 items-center justify-center'>
        <button
          onClick={() =>
            router.push(
              `/search?term=${term}&searchType=${searchType}&start=${
                Number(start) - 10 === 1 ? "" : Number(start) - 10
              }`
            )
          }
          className='hover:bg-neutral-100 p-2.5 rounded-full cursor-pointer disabled:opacity-30'
          disabled={!Number(start)}
        >
          <BsChevronLeft size={20} className='-ml-0.5' />
        </button>
        <Image alt='google logo' width={120} src={googleLogo} />
        <button
          onClick={() =>
            router.push(
              `/search?term=${term}&searchType=${searchType}&start=${
                Number(start) ? Number(start) + 10 : 11
              }`
            )
          }
          className='hover:bg-neutral-100 p-2.5 rounded-full cursor-pointer disabled:opacity-30'
          disabled={Number(start) === 91}
        >
          <BsChevronRight size={20} className='-mr-0.5' />
        </button>
      </div>
      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <button className='flex items-center gap-2 -mt-4'>
                <span>Page:</span>
                <span className='font-medium'>
                  {start ? Number(start[0]) + 1 : 1}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Select Page</PopoverHeader>
              <PopoverBody>
                <div className='flex gap-5 justify-center'>
                  {starts.map(({ index, page }) => {
                    return (
                      <Link
                        onClick={onClose}
                        href={`/search?term=${term}&searchType=${searchType}&start=${index}`}
                        className='link hover:text-blue-600'
                      >
                        {page}
                      </Link>
                    );
                  })}
                </div>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SearchPagination;
