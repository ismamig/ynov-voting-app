import { useState } from "react"

export default function Item({ title }) {
  const [hasVoted, setHasVoted] = useState(false)

  const voteYes = () => {
    setHasVoted(true)
  }

  return (
    <>
      <div className="bg-neutral rounded-md p-4">
        <div className="text-center text-2xl">{title}</div>
        {!hasVoted && (
          <div className="mt-6 flex justify-center gap-10">
            <button className="btn btn-primary text-black rounded-md" onClick={() => voteYes()}>YES</button>
            <button className="btn btn-error text-black rounded-md">NO</button>
          </div>
        )}
        {hasVoted && (
          <div className="mt-6 flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold">45%</div>
              <div className="text-green-500">Voted YES</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold">55%</div>
              <div className="text-red-500">Voted NO</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}