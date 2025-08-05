export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Product Details - ID: {params.id}
      </h1>
      <p className="text-center text-gray-600">
        Product details will be displayed here
      </p>
    </div>
  );
}
