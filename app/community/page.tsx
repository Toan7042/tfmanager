"use client";

import CommunityChat from "../components/custom/CommunityChat";
import Navbar from "../components/Nav";

export default function CommunityPage() {
  return (
    <main className="bg-gray-50 h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-full ml-0 p-0 overflow-hidden">
        <CommunityChat />
      </div>
    </main>
  );
}