import { ReactNode } from "react"

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void
}

export function Dialog({
  children,
  open = false,
  onClose = () => {}
}: DialogProps) {
  if(!open) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0  w-screen h-screen flex justify-center items-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 -z-10" onClick={onClose} />
      {children}
    </div>
  )
}

export function DialogContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-100 p-8 rounded-[2rem] min-w-96 max-w-96 min-h-72 shadow-lg flex flex-col ${className}`}>
      {children}
    </div>
  )
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col mb-5">
      {children}
    </div>
  )
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl mb-5">
      {children}
    </h2>
  )
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return (
    <p className="font-light">
      {children}
    </p>
  )
}

export function DialogContent({ children }: { children?: ReactNode }) {
  return (
    <div className="flex-1 mb-5">
      {children}
    </div>
  )
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex space-x-2 justify-end">
      {children}
    </div>
  )
}
