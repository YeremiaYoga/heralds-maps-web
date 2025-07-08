import Navbar from "../../components/Navbar.jsx";

export default function WithNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-[url('/assets/bg_gray.webp')] bg-repeat bg-[length:400px] min-h-screen text-white">
        <div className="max-w-[1200px] mx-auto px-4">{children}</div>
      </div>
    </>
  );
}
