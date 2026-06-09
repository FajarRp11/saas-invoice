import { columns, Client } from "./data-table/columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Client[]> {
  return [
    {
      id: "728ed52f",
      name: "John Doe",
      email: "example@gmail.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "example@gmail.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      id: "728ed52f",
      name: "John Doe",
      email: "example@gmail.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
