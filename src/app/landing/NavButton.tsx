"use client";

import { FC, ReactNode } from "react";

import { useRouter } from "next/navigation";

interface NavButtonProps {
  path?: string;
  children: ReactNode;
  className?: string;
}

const NavButton: FC<NavButtonProps> = ({ children, path, className }) => {
  const router = useRouter();
  return (
    <button
      className={`bg-gray-100 hover:text-orange-500 ${className}`}
      onClick={path ? () => router.push(path) : undefined}
    >
      {children}
    </button>
  );
};

export default NavButton;