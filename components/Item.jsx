import { useState, useEffect } from "react"
import { useRouter } from 'next/router'

export default function Item({ id, title, desc }) {
  const [hasVoted, setHasVoted] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ userVote, setUserVote ] = useState(0)
  const [ votes, setVotes ] = useState([])

  const router = useRouter()

  const vote = async (value) => {
    setLoading(true)
    const res = await fetch(`/api/votes/${id}`, {
      method: 'post',
      body: JSON.stringify(value)
    })
    const data = await res.json()
    const res2 = await fetch(`/api/votes/${id}`)
    .then((res) => res.json())
      .then((data) => setVotes(data))
    setLoading(false)
    setHasVoted(true)
  }


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/votes/${id}`)
      const data = await res.json()
      if (data.length > 0) {
        setUserVote(data[0].value)
        setHasVoted(true)
        setVotes(data)
      }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  }

  const getPercentage = (value) => {
    if (value === 1) {
      return percentage(votes.filter(vote => vote.value === 1).length, votes.length)
    } else {
      return percentage(votes.filter(vote => vote.value === 0).length, votes.length)
    }
  }

  return (
    <>
      <div className="bg-neutral rounded-md p-4">
        <div className="text-center text-2xl">{title}</div>
        <div className="text-center text-xs text-neutral-500">Proposal ID: {id}</div>
        <div className="text-center text-neutral-500">{desc}</div>
        {!hasVoted && (
          <div className="mt-6 flex justify-center gap-10">
            <button className="btn btn-primary text-black rounded-md" onClick={() => vote(1)}>YES</button>
            <button className="btn btn-error text-black rounded-md" onClick={() => vote(0)}>NO</button>
          </div>
        )}
        {hasVoted && (
          <>
            <div className="my-3 text-center">
              You voted <b className={`text-${userVote === 1 ? 'green' : 'red'}-500`}>{userVote === 1 ? 'YES' : 'NO'}</b>
            </div>
            <div className=" flex justify-center gap-10">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{getPercentage(1)}%</div>
                <div className="text-green-500">Voted YES</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{getPercentage(0)}%</div>
                <div className="text-red-500">Voted NO</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}