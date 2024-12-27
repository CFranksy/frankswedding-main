"use server";

import Home from "../page";
import { GET_SpecificGuest } from "@/functions/guests";
import { ClientAdd } from "@/components/ClientAdd";

type UserPageProps = {
  params: {
    userid: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const guest = await GET_SpecificGuest("", params.userid);

  return (
    <>
      <ClientAdd data={JSON.stringify(guest)} userId={params.userid} />
      <Home />
    </>
  ); // Render the Home component, optionally passing props if needed
}
