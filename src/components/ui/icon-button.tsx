interface CustomButtonProps {
  variant?: 'default' | 'filled' | 'tonal' | 'outlined'
}

const classes = {
  variant: {
    default: 'relative !inline-flex !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-surface-300 focus:bg-surface-400 dark:text-primary-200 dark:hover:bg-surfacedark-300 dark:focus:bg-surfacedark-400',
    filled: 'relative !inline-flex !items-center items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] hover:shadow-md text-sm tracking-[.00714em] font-medium bg-primary-600 text-white dark:bg-primary-200 dark:text-primary-800',
    tonal: 'relative !inline-flex !items-center items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100',
    outlined: 'relative !inline-flex !items-center items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium border border-gray-500 text-primary-600 dark:border-gray-400 dark:text-primary-200',
  }
}

export function IconButton({
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<"button"> & CustomButtonProps) {
  const className = classes.variant[variant]

  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}
