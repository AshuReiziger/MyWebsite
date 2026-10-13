import { redirect } from "next/navigation";

export default async function BookWorkshopPage({ searchParams }: PageProps<"/teach/workshops/book">) {
  const params = await searchParams;
  const workshop = typeof params.workshop === "string" ? params.workshop : undefined;

  redirect(workshop ? `/teach/workshops/${workshop}` : "/teach/workshops");
}
