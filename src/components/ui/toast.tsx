import { Icon } from "./icon";

import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  id: string | number;
  title: string;
}

/** A fully custom toast that still maintains the animations and interactions. */
export function Toast(props: ToastProps) {
  const { title, id } = props;

  return (
    <div className="flex flex-row items-center sm:w-80 gap-4 py-3 px-4 shadow-md rounded text-neutral-50 dark:text-neutral-800 bg-neutral-800 dark:bg-neutral-100 z-50">
      <p className="flex flex-grow text-sm tracking-[0.25px]">{title}</p>
      <button
        className="flex items-center"
        onClick={() => {
          sonnerToast.dismiss(id);
        }}
      >
        <Icon name="close" />
      </button>
    </div>
  )

  // return (
  //   <div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
  //     <div className="flex flex-1 items-center">
  //       <div className="w-full">
  //         <p className="text-sm font-medium text-gray-900">{title}</p>
  //         <p className="mt-1 text-sm text-gray-500">{description}</p>
  //       </div>
  //     </div>
  //     <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
  //       <button
  //         className="rounded bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
  //         onClick={() => {
  //           button.onClick();
  //           sonnerToast.dismiss(id);
  //         }}
  //       >
  //         {button.label}
  //       </button>
  //     </div>
  //   </div>
  // );
}

// export default function Headless() {
//   return (
//     <button
//       className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
//       onClick={() => {
//         toast({
//           title: 'This is a headless toast',
//           description: 'You have full control of styles and jsx, while still having the animations.',
//           button: {
//             label: 'Reply',
//             onClick: () => sonnerToast.dismiss(),
//           },
//         });
//       }}
//     >
//       Render toast
//     </button>
//   );
// }


// w-full md:max-w-[364px]