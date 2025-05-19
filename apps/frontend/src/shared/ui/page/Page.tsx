export function Page(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {props.children}
      </div>
    </div>
  );
}
