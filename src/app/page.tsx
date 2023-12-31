"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../../graphql/client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import StateSelector from "./StateSelector";
import Transition from "./Transition";

const Home: FC = () => (
  <ApolloProvider client={client}>
    <Transition>
      <main className="flex flex-col items-center">
        <nav className='w-full bg-red-50'>
          <Image
            src="https://via.placeholder.com/34?text=Logo"
            alt="logo"
            width={34}
            height={34}
            className='rounded-full'
            priority
          />
        </nav>
        <div>
          test
        </div>
        <Link href="/map">
          <span>Map</span>
        </Link>
        <StateSelector states={["state_of_mexico", "puebla", "coahuila", "queretaro", "nuevo_leon", "chihuahua"]} />
      </main>
    </Transition>
  </ApolloProvider>
);

export default Home;
