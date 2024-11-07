import React from "react";
import { useParams } from "react-router-dom";

export default function Kanban() {
  let params = useParams();
  return <div>Kanban: {params.id}</div>;
}
