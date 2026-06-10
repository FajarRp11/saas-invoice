import { columns } from "./data-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/app/actions/product";
import CreateProductDialog from "@/components/create-product-dialog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your products and services
          </p>
        </div>
        <CreateProductDialog />
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
