import { useState } from "react";
import { AppBar } from "../../components/layout/app-bar";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { MapProvider } from "../../components/map/map-provider";

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <AppBar toggleSidebar={() => setSidebarOpen((isOpen) => !isOpen)} />
      <div className="w-full h-[calc(100vh-4rem)] mt-[4rem] grid grid-cols-12">
        <div className={`absolute ${isSidebarOpen ? 'left-0' : '-left-[400px]'} md:left-0 transition-all z-30 lg:relative lg:col-span-3 bg-neutral-10 dark:bg-neutral-900`}>
          <AppSidebar />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <MapProvider />
        </div>
      </div>
    </>
  )
}
