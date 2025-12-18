import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const yekan = localFont({
  src: 'YekanBakhLight.ttf',   
  variable: '--font-yekan',
  display: 'swap',
});

export const platinum = localFont({
  src: 'Platinum.ttf',   
  variable: '--font-platinum',
  display: 'swap',
});

export const wildworld = localFont({
  src: 'WILDWORLD.woff2',    
  variable: '--font-wildworld',
  display: 'swap',
});