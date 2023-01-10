import Item from "./Item";

export const items = [
  {
    title: "Item 1",
  }
]

export default function ItemList() {
  return (
    <div className="">
      {items.map((item, index) => (
        <Item key={index} title={item.title} />
      ))}
    </div>
  )
}