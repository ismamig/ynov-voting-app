import Layout from "../components/Layout"

export default function Profile() {
  return (
    <div className=" flex flex-col items-center">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <h2 className="text-2xl mt-3">John Doe</h2>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-16">
          <h3 className="text-xl">My votes</h3>
          <span>Votes : 0</span>
        </div>
      </div>
      <div className="mt-10">
        <button className="btn btn-outline btn-error mb-auto">Sign out</button>
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