import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]'

export async function getServerSideProps({ req, res }) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
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

export default function SignIn() {

  return (
    <div data-theme="halloween" className="flex flex-col justify-center h-screen items-center">
      <div className="my-4 text-center">
        <h1 className="text-4xl font-bold text-primary">Welcome to <b className="text-5xl">RateIt!</b></h1>
        <p className="text-xl text-secondary">An app where you can vote for anything !</p>
        <p className="text-xl mt-6">Sign in to continue</p>
      </div>
      <div className="card p-2 flex gap-2">
        <button className="btn btn-primary btn-outline" onClick={() => signIn("github")}>Sign in with Github</button>
      </div>
    </div>
  );
}
