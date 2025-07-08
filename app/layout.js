import "./globals.css";

export const metadata = {
  title: "Heralds Maps",
  description: "Explore tactical maps with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
