import { Icon } from "../ui/icon";
import { IconButton } from "../ui/icon-button";
import { AddContactDialog } from "../dialog/add-contact-dialog";
import { UserAccountDialog } from "../dialog/user-account-dialog";

const site_title = 'UEX Maps'

export function AppBar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
      <header className="w-full h-16 px-4 flex flex-row items-center justify-between gap-1.5 bg-surface-100 dark:bg-surfacedark-100 shadow absolute top-0 left-0">
        <div className="flex md:hidden space-x-1 items-center">
          <IconButton onClick={toggleSidebar}>
            <Icon name="menu" />
          </IconButton>
          <span>{site_title}</span>
        </div>
        <div>
          <a href="/" className="hidden md:flex items-center space-x-2">
            <Icon name="map" />
            <span>{site_title}</span>
          </a>
        </div>
        <div className="flex space-x-1">
          <AddContactDialog />
          <UserAccountDialog />
        </div>
      </header>
  )
}