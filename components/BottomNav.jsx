import { HomeIcon, UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export default function BottomNav() {
  const router = useRouter()
  const { pathname } = router

  const buttons = [
    {
      name: 'Home',
      icon: HomeIcon,
      path: '/',
    },
    // {
    //   name: 'Add',
    //   icon: PlusIcon,
    //   path: '/add',
    // },
    {
      name: 'Profile',
      icon: UserIcon,
      path: '/profile',
    },
  ]

  return (
    <>
      <div className="btm-nav lg:hidden md:hidden">
        {buttons.map((button) => {
          const Icon = button.icon
          return (
            <button
              key={button.name}
              className={pathname === button.path ? 'active' : ''}
              onClick={() => router.push(button.path)}
            >
              <Icon className="h-5 w-5" />
            </button>
          )
        })}
      </div>
    </>
  )
}
