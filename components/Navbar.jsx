"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  assets,
  BagIcon,
  CartIcon,
  HomeIcon,
} from "@/assets/assets";

import { useAppContext } from "@/context/AppContext";

import {
  useClerk,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router } = useAppContext();

  const { openSignIn } = useClerk();

  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">

      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
        width={130}
        height={40}
        priority
      />

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">

        <Link
          href="/"
          className="hover:text-black transition"
        >
          Home
        </Link>

        <Link
          href="/all-products"
          className="hover:text-black transition"
        >
          Shop
        </Link>

        <Link
          href="/"
          className="hover:text-black transition"
        >
          About
        </Link>

        <Link
          href="/"
          className="hover:text-black transition"
        >
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="border px-4 py-1.5 rounded-full text-xs hover:bg-gray-100 transition"
          >
            Seller Dashboard
          </button>
        )}

      </div>

      {/* ================= DESKTOP RIGHT ================= */}
      <div className="hidden md:flex items-center gap-5">

        <Image
          src={assets.search_icon}
          alt="search"
          width={18}
          height={18}
          className="cursor-pointer"
        />

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>

              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />

              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />

            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-black transition"
          >
            <Image
              src={assets.user_icon}
              alt="user"
              width={20}
              height={20}
            />
            <span>Account</span>
          </button>
        )}

      </div>

      {/* ================= MOBILE ================= */}
      <div className="flex md:hidden items-center gap-3">

        {user ? (
          <UserButton
            afterSignOutUrl="/"
           
          >

            <UserButton.MenuItems>

              {/* Home */}
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push("/")}
              />

              {/* Shop */}
              <UserButton.Action
                label="Shop"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/all-products")}
              />

              {/* About */}
              <UserButton.Action
                label="About"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/")}
              />

              {/* Contact */}
              <UserButton.Action
                label="Contact"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/")}
              />

              {/* Cart */}
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />

              {/* Orders */}
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />



            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center"
          >
            <Image
              src={assets.user_icon}
              alt="user"
              width={22}
              height={22}
            />
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;