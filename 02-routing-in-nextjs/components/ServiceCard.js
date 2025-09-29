import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-zinc-500/10 p-4 rounded-lg">
      <h1 className="text-3xl font-bold">
        {service.id}.  {service.name}
      </h1>
    </div>
  );
};

export default ServiceCard;
