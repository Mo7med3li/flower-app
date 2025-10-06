// Local Components
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main children components */}
      <main className="font-sarabun w-full overflow-hidden">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
