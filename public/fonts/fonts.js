// app/lib/fonts.ts   (or wherever your Montserrat is)

import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

// Existing Google Montserrat
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// New: Local Wild World (super simple since it's single weight)
export const wildworld = localFont({
  src: 'WILDWORLD.woff2',    
  variable: '--font-wildworld',
  display: 'swap',
});