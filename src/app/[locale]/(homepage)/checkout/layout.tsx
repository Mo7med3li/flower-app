export default async function Layout({
  summary,
  children,
}: {
  address: React.ReactNode;
  summary: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col py-2">
        {/* Cart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 pt-10 md:px-20 px-4">
          {children}
          {summary}
        </div>
      </main>
    </>
  );
}
