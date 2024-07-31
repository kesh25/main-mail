import Nav from "./components/nav";
import Footer from "./components/footer"; 
import ScrollToTop from "@/components/utils/scroll-to-top"; 

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <main className="min-h-[100vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
