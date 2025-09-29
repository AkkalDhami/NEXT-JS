import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  // const search = await searchParams;
  // console.log(search);
  // const myCookies = await cookies();
  // console.log(myCookies);

  const services = [
    {
      id: 1,
      name: "App Development",
    },
    {
      id: 2,
      name: "Web Development",
    },
    {
      id: 3,
      name: "Digital Marketing",
    },
  ];

  return (
    <div className="p-12">
      <Header />
      <h1>Service Page</h1>

      <div className="flex gap-4 mt-4 flex-col">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
