import Link from "next/link";

export default function SubNav() {
  return (
    <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#1b2838] px-8 py-2 flex flex-wrap items-center gap-6 text-white text-sm">
      <a href="#">Live Gallery</a>
      <Link href="/products" className="hover:underline">
        All Product
      </Link>
      <a href="#">Tutorials</a>
      <a href="#">Info & FAQ</a>
      <a href="#">Subcribe</a>
    </div>
  );
}
