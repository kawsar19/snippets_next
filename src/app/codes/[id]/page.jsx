import React from "react";
import GistDetails from "./GistDetails";

const page = ({ params }) => {
  return (
    <div>
      <GistDetails id={params.id} />
    </div>
  );
};

export default page;
