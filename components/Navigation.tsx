import React from "react";
import Link from "next/link";

const Navigation = ({ cartItemCount }: { cartItemCount: number }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <a className="text-white text-xl font-bold">Hack Club Shop</a>
        </Link>
        <div className="flex items-center">
          <Link href="/shop">
            <a className="text-white ml-4">Shop</a>
          </Link>
          <div className="text-white ml-4">{cartItemCount} Items</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;