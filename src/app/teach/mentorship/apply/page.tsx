import { redirect } from "next/navigation";

export default async function MentorshipApplyPage({
  searchParams,
}: PageProps<"/teach/mentorship/apply">) {
  const params = await searchParams;
  const track = typeof params.track === "string" ? params.track : undefined;

  redirect(track ? `/teach/mentorship/${track}` : "/teach/mentorship");
}
