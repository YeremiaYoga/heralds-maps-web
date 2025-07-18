export default function WithoutNavbarLayout({ children }) {
  return (
    <div className=" bg-repeat bg-[length:400px] min-h-screen text-white">
      <div className="">{children}</div>
    </div>
  );
}
