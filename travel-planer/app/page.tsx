import Image from "next/image";
import Dashboard from "../pages/dashboard/dashboard";
import Object from "../pages/object/Object";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import Wishlist from "@/pages/wishList/script";




export default function Home() {
  return (
      <div>
        <Dashboard />
      </div>
  );
}
