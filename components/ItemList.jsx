import { useState, useEffect } from "react";
import Item from "./Item";

export default function ItemList() {

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/proposals');
      const data = await res.json();
      setProposals(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {proposals.map((item, index) => (
        <Item key={index} title={item.title} id={item.id} desc={item.description} />
      ))}
    </div>
  )
}