import "./css/globals.css";
import { Providers } from "@/redux/provider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata = {
  title: "xxx",
  description: "xxx",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <Providers>
          <header>
            <Header />
          </header>
          <main className="flex-grow flex flex-col justify-center items-center">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
