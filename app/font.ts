import { Work_Sans, Sora } from "next/font/google";

//  Primary font
export const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})
 
//  Secondary font
export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})