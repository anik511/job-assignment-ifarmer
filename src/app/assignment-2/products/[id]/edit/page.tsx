export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Edit Product - ID: {id}
      </h1>
      <p className="text-center text-gray-600">
        Product edit form will be displayed here
      </p>
    </div>
  );
}
