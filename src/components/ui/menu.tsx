// "use client";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// import { motion } from "framer-motion";

// const transition = {
//   type: "spring",
//   mass: 0.5,
//   damping: 11.5,
//   stiffness: 100,
//   restDelta: 0.001,
//   restSpeed: 0.001,
// };

// export const MenuItem = ({
//   setActive,
//   active,
//   item,
//   children,
// }: {
//   setActive: (item: string) => void;
//   active: string | null;
//   item: string;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <div onMouseEnter={() => setActive(item)} className="relative ">
//       <motion.p
//         transition={{ duration: 0.3 }}
//         className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
//       >
//         {item}
//       </motion.p>
//       {active !== null && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 10 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={transition}
//         >
//           {active === item && (
//             <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
//               <motion.div
//                 transition={transition}
//                 layoutId="active" // layoutId ensures smooth animation
//                 className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
//               >
//                 <motion.div
//                   layout // layout ensures smooth animation
//                   className="w-max h-full p-4"
//                 >
//                   {children}
//                 </motion.div>
//               </motion.div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export const Menu = ({
//   setActive,
//   children,
// }: {
//   setActive: (item: string | null) => void;
//   children: React.ReactNode;
// }) => {
//   return (
//     <nav
//       onMouseLeave={() => setActive(null)} // resets the state
//       className="relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 "
//     >
//       {children}
//     </nav>
//   );
// };

// export const ProductItem = ({
//   title,
//   description,
//   href,
//   src,
// }: {
//   title: string;
//   description: string;
//   href: string;
//   src: string;
// }) => {
//   return (
//     <Link href={href} className="flex space-x-2">
//       <Image
//         src={src}
//         width={140}
//         height={70}
//         alt={title}
//         className="flex-shrink-0 rounded-md shadow-2xl"
//       />
//       <div>
//         <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
//           {title}
//         </h4>
//         <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
//           {description}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export const HoveredLink = ({ children, ...rest }: any) => {
//   return (
//     <Link
//       {...rest}
//       className="text-neutral-700 dark:text-neutral-200 hover:text-black "
//     >
//       {children}
//     </Link>
//   );
// };



// BENTO GRID

// import { cn } from "@/lib/utils";
// import React from "react";
// import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
// import {
//   IconArrowWaveRightUp,
//   IconBoxAlignRightFilled,
//   IconBoxAlignTopLeft,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";

// export function BentoGridDemo() {
//   return (
//     <BentoGrid className="max-w-4xl mx-auto">
//       {items.map((item, i) => (
//         <BentoGridItem
//           key={i}
//           title={item.title}
//           description={item.description}
//           header={item.header}
//           icon={item.icon}
//           className={i === 3 || i === 6 ? "md:col-span-2" : ""}
//         />
//       ))}
//     </BentoGrid>
//   );
// }
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );
// const items = [
//   {
//     title: "The Dawn of Innovation",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Skeleton />,
//     icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Digital Revolution",
//     description: "Dive into the transformative power of technology.",
//     header: <Skeleton />,
//     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Art of Design",
//     description: "Discover the beauty of thoughtful and functional design.",
//     header: <Skeleton />,
//     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Power of Communication",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Pursuit of Knowledge",
//     description: "Join the quest for understanding and enlightenment.",
//     header: <Skeleton />,
//     icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Joy of Creation",
//     description: "Experience the thrill of bringing ideas to life.",
//     header: <Skeleton />,
//     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Spirit of Adventure",
//     description: "Embark on exciting journeys and thrilling discoveries.",
//     header: <Skeleton />,
//     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//   },
// ];



// import { cn } from "@/lib/utils";

// export const BentoGrid = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <div
//       className={cn(
//         "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// };

// export const BentoGridItem = ({
//   className,
//   title,
//   description,
//   header,
//   icon,
// }: {
//   className?: string;
//   title?: string | React.ReactNode;
//   description?: string | React.ReactNode;
//   header?: React.ReactNode;
//   icon?: React.ReactNode;
// }) => {
//   return (
//     <div
//       className={cn(
//         "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
//         className
//       )}
//     >
//       {header}
//       <div className="group-hover/bento:translate-x-2 transition duration-200">
//         {icon}
//         <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
//           {title}
//         </div>
//         <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
//           {description}
//         </div>
//       </div>
//     </div>
//   );
// };
