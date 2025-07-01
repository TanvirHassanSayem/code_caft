"use client";

import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <div className="relative flex items-center">
      {/* Signed In User Button */}
      <div className="relative">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent hover:ring-blue-500/50 transition-all duration-200 shadow-lg hover:shadow-xl",
              userButtonPopoverCard: "bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-xl p-1",
              userButtonPopoverActions: "space-y-1",
              userButtonPopoverActionButton: "text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 flex items-center gap-3",
              userButtonPopoverActionButtonIcon: "w-4 h-4",
              userButtonPopoverFooter: "border-t border-gray-100 mt-2 pt-2"
            }
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<User className="size-4" />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
        
        {/* Online Status Indicator - Only shows when signed in */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
      </div>

      {/* Signed Out State */}
      <SignedOut>
        <div className="flex items-center gap-3">
          {/* Enhanced Login Button Container */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative">
              <LoginButton />
            </div>
          </div>
          
          {/* Ultra Stylish Guest Button */}
          <div className="relative group cursor-pointer">
            {/* Animated background gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
            
            {/* Main button */}
            <div className="relative flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 hover:from-purple-900 hover:via-pink-900 hover:to-blue-900 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-xl">
              {/* Avatar with animated border */}
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-pulse">
                  <User className="w-4 h-4 text-white drop-shadow-sm" />
                </div>
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 group-hover:animate-spin" style={{maskImage: 'linear-gradient(transparent 80%, black)'}}></div>
              </div>
              
              {/* Text with gradient */}
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent hidden sm:inline group-hover:from-white group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                Guest User
              </span>
              
              {/* Sparkle effect */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}

export default HeaderProfileBtn;