"use client"

import React from "react";
import { UserAuth} from "@/app/context/AuthContext"

export default function Page() {
  const {user} = UserAuth();
  console.log(user)
  return (
    <div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        test background
      </p>
    </div>
  );
}