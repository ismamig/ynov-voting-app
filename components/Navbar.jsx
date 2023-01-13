import Link from "next/link"
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
          <a className="btn btn-ghost normal-case text-xl">RateIt!</a>
        </div>
        <div className="lg:flex md:flex hidden flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/profile">Profil</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}