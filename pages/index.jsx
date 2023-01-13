import { useSession } from 'next-auth/react';
import Head from 'next/head'
import ItemList from '../components/ItemList';
import Layout from '../components/Layout'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'


export async function getServerSideProps({ req, res }) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
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

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div data-theme="halloween">
      <Head>
        <title>RateIt!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ItemList/>
      </main>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}