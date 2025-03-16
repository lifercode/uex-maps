import { v4 as uuidv4 } from "uuid";
import { Icon } from "./icon";

interface CustomInputProps {
  variant?: 'outlined' | 'filled';
  icon?: string;
}

const classes = {
  variant: {
    filled: {
      default: {
        input: 'w-full h-14 block leading-5 relative pt-2 px-4 rounded-t text-gray-800 bg-gray-100 dark:bg-gray-700 border-b focus:border-b-2 border-gray-500 dark:border-gray-400 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:focus:border-primary-200 peer',
        label: 'absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-invalid:text-error-600 dark:peer-invalid:text-error-200',
      },
      icon: {
        input: 'w-full h-14 block leading-5 relative pt-2 pl-14 pr-4 rounded-t text-gray-800 bg-gray-100 dark:bg-gray-700 border-b focus:border-b-2 border-gray-500 dark:border-gray-400 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:focus:border-primary-200 peer',
        label: 'absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] left-14 peer-focus:left-14 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-invalid:text-error-600 dark:peer-invalid:text-error-200',
      },
    },
    outlined: {
      default: {
        input: 'w-full h-14 block leading-5 relative py-2 px-4 rounded bg-neutral-10 dark:bg-neutral-900 border focus:border-2 border-gray-500 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:border-gray-400 dark:focus:border-primary-200 peer',
        label: 'absolute tracking-[.03125em] text-gray-500 dark:text-gray-400 bg-neutral-10 dark:bg-neutral-900 duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:bg-neutral-10 dark:peer-focus:bg-neutral-900 peer-focus:px-1 peer-invalid:text-error-600 dark:peer-invalid:text-error-200',
      },
      icon: {
        input: 'w-full h-14 block leading-5 relative py-2 pl-14 pr-4 rounded bg-neutral-10 dark:bg-neutral-900 border focus:border-2 border-gray-500 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:border-gray-400 dark:focus:border-primary-200 peer',
        label: 'absolute tracking-[.03125em] text-gray-500 dark:text-gray-400 bg-neutral-10 dark:bg-neutral-900 duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] left-12 peer-focus:left-12 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:bg-neutral-10 dark:peer-focus:bg-neutral-900 peer-focus:px-1 peer-invalid:text-error-600 dark:peer-invalid:text-error-200',
      },
    },
  }
}

export function Input({
  variant = 'outlined',
  id = uuidv4(),
  icon,
  placeholder,
  ...props
}: React.ComponentProps<"input"> & CustomInputProps) {
  const inputClass = classes.variant[variant][icon ? 'icon' : 'default'].input
  const labelClass = classes.variant[variant][icon ? 'icon' : 'default'].label

  return (
    <div className={`relative z-0 ${props?.disabled && 'opacity-50 [&>label]:cursor-not-allowed [&>input]:cursor-not-allowed'}`}>
      {Boolean(icon) && (
        <div className="absolute left-4 top-4 z-10">
          <Icon name={icon} />
        </div>
      )}
      <input {...props} id={id} className={inputClass} placeholder=" " />
      {Boolean(placeholder) && (
        <label htmlFor={id} className={labelClass}>
          {placeholder}
        </label>
      )}
    </div>
  )
}