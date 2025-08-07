import { ReduxProvider } from "@/store/ReduxProvider";

export default function Assignment1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </ReduxProvider>
  );
}
