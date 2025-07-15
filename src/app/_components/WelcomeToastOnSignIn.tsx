"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function WelcomeToastOnSignIn() {
  const { isSignedIn, user } = useUser();
  const hasShown = useRef(false);

  useEffect(() => {
    if (isSignedIn && !hasShown.current) {
      toast.custom((t) => (
        <div
          className={`
            ${t.visible ? 'animate-enter' : 'animate-leave'}
            flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border border-green-500/40 
            bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700
            text-white font-semibold
          `}
          style={{
            minWidth: 250,
            maxWidth: 340,
          }}
        >
          <span className="text-2xl">👋</span>
          <div>
            <div className="text-base font-bold tracking-tight">Welcome{user?.firstName ? `, ${user.firstName}` : ""}!</div>
            <div className="text-sm text-green-100">You are welcome here. Enjoy!!</div>
          </div>
        </div>
      ), { duration: 3200 });
      hasShown.current = true;
    }
    if (!isSignedIn) {
      hasShown.current = false;
    }
  }, [isSignedIn, user?.firstName]);

  return null;
}
