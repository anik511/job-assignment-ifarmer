export default function Assignment2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
