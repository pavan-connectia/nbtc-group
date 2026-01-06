import React, { useState } from "react";
import axios from "axios";

export default function EmployeeLogin() {


  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 px-5">
      <div className="w-full max-w-md rounded-2xl bg-white/40 backdrop-blur-lg border border-white/40 p-10 shadow-xl">

        <img src="/logo.png" alt="NBTC Logo" className="mx-auto mb-6 w-32 drop-shadow-sm" />

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employee Login</h1>
        </div>

       

      </div>
    </div>
  );
}
