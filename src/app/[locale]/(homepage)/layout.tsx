// Local Components
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main children components */}
      <main className="font-sarabun w-full px-5">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
