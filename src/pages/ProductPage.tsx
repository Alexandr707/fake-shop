import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  console.log(id);

  return null;
}

export default ProductPage;
