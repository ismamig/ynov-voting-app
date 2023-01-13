import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import Layout from "../components/Layout"
import { signOut } from "next-auth/react"
import {useEffect, useState } from "react"

export async function getServerSideProps({ req, res }) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session
    }
  }
}

export default function Profile() {

  const [ user, setUser ] = useState({})

  const [ votes, setVotes ] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch('http://localhost:3000/api/me')
      const dbUser = await data.json()
      setUser(dbUser)
      setVotes(dbUser.votes)
    }
    fetchUser()
  }, [])

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img src={user ? user.image : ""} alt="profile pic" />
          </div>
        </div>
        <h2 className="text-2xl mt-3">{user.name}</h2>
        <h2 className="font-thin mt-3">{user.email}</h2>
        <div className="mt-5">
          <div className="flex items-center justify-between gap-16">
            <h3 className="text-xl">My votes</h3>
            <span>Votes : {votes ? votes.length : '0'}</span>
          </div>
        </div>
        <div className="mt-10">
          <button className="btn btn-outline btn-error mb-auto" onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
      <div className="">
        <div className="text-md my-4">My previous votes</div>
        <div>
          {votes ? votes.map((vote, index) => (
            <div key={index} className="card bg-base-100 shadow-xl gap-16 px-1 my-4">
              <div className="card-body flex items-center justify-between gap-4">
                <div>{vote.proposal.title}</div>
                <div>You voted {vote.value === 1 ? 'YES' : 'NO'}</div>
              </div>
            </div>
          )) : ""}
        </div>
      </div>
    </div>
  )
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}