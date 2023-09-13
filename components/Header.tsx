"use client";

import { Button } from "@/components";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // reset playing songs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className,
      )}
    >
      <div className="flexBetween mb-4 w-full">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onChange={() => router.back()}
            className="flexCenter rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onChange={() => router.forward()}
            className="flexCenter rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button className="flexCenter rounded-full bg-white p-2 transition hover:opacity-75">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flexCenter rounded-full bg-white p-2 transition hover:opacity-75">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flexBetween gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button
                onClick={handleLogout}
                className="border-red-500 bg-red-500/10 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent font-medium text-neutral-300"
                >
                  Get Started
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
