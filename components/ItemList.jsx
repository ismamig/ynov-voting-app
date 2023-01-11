import { useState, useEffect } from "react";
import Item from "./Item";

export const items = [
  {
    title: "Item 1",
  }
]

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
    <div className="">
      {proposals.map((item, index) => (
        <Item key={index} title={item.title} />
      ))}
    </div>
  )
}