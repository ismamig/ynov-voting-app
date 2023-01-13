import BottomNav from './BottomNav'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div data-theme="halloween">
      <Navbar />
      <main className="p-4 h-max pb-16">
        {children}
      </main>
      <BottomNav/>
    </div>
  )
}