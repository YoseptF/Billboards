import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import StateSelector from "./StateSelector";
import Transition from "./Transition";

const Home: FC = () => (
  <Transition>
    <main className="flex flex-col items-center">
      <nav className='w-full bg-red-50 flex justify-between'>
        <Image
          src="https://via.placeholder.com/34?text=Logo"
          alt="logo"
          width={34}
          height={34}
          className='rounded-full'
          priority
        />
        <Link href="/login">
          <span>Login</span>
        </Link>
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
);

export default Home;
