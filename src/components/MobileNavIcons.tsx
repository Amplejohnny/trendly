"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import CartModal from "./CartModal";
import { useCartStore } from "@/hooks/useCartStore";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLoggedIn) {
      setOpen(false);
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
      setOpen(false);
      router.push("/profile");
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setOpen(false);
    router.push(logoutUrl);
    router.push("/");
  };

  const handleLogIn = async () => {
    setOpen(false);
    router.push("/login");
  };

  const handleMenuItemClick = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <div onClick={() => handleMenuItemClick("/")}>Homepage</div>
          <div onClick={() => handleMenuItemClick("/list?cat=all-products")}>
            Shop
          </div>
          <div onClick={() => handleMenuItemClick("/")}>About</div>
          <div onClick={handleProfile}>Profile</div>
          <div
            className="mt-2 cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
                handleLogout();
              } else {
                handleLogIn();
              }
            }}
          >
            {!isLoggedIn && "Login"}
            {isLoggedIn && (isLoading ? "Logging out" : "Logout")}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { counter, getCart } = useCartStore();
  const wixClient = useWixClient();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setIsCartOpen((prev) => !prev)}
    >
      <Image src="/cart.png" alt="Cart Icon" width={22} height={22} />
      <div className="absolute -top-4 -right-4 w-6 h-6 bg-myPink rounded-full text-white text-sm flex items-center justify-center">
        {counter}
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export { Menu, MobileCart };
