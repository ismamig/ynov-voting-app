import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()
  const { pathname } = router

  const routes = {
    "/": "Home",
    "/profile": "Profile",
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">{routes[pathname]}</a>
        </div>
        <div className="lg:flex md:flex hidden flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>Profil</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}