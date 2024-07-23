'use client'

import RouteGuard from "@/components/app/RouteGuard"
import Navbar from "@/components/Navbar"

export default function PrivateLayout({ children }: Readonly<{children: React.ReactNode}>) {

  return (
    <RouteGuard>
      <Navbar/>
        {children}
    </RouteGuard>
  )
}
