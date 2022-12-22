export default function ItemList() {
  return (
    <div className="bg-neutral rounded-md p-4">
      <div className="text-center text-2xl">Item Title</div>
      <div className="mt-6 flex justify-center gap-10">
        <button className="btn btn-primary text-black rounded-md">YES</button>
        <button className="btn btn-error text-black rounded-md">NO</button>
      </div>
    </div>
  )
}