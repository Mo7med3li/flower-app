import { occasion } from "@/lib/types/occasions";
import { getProducts } from "@/lib/api/products.api";
import { getSingleOccasion } from "./_api/get-single-occasion";

const OccasionsDetailPage = async ({ params }: { params: { id: string } }) => {
  // occasion response
  const occasion: occasion = await getSingleOccasion(params.id);

  // occasion products response
  const occasionProducts = await getProducts({ occasion: params.id });
  if ("error" in occasionProducts) {
    throw new Error(occasionProducts.error);
  }

  return (
    <div>
      <h1>
        Occasions Page {params.id} {occasion.name}
      </h1>
    </div>
  );
};

export default OccasionsDetailPage;
