'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';



export default function BottomNav() {
  const locale = useLocale();
  const t = useTranslations('HomePage');
  const links = [
    { name: t('Home'), href: '/' },
    { name: t('Submit') , href: '/submit' },
    { name: t('Profile'), href: '/profile' },
  ];
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-8 left-0  w-full flex justify-center">
      <div className="flex items-center justify-between rounded-full bg-primary-light text-primary-dark w-72 p-2">
        {links.map((link) => {
          return (
              <Link key={link.name} href={link.href} className={clsx(`px-4 h-10 flex items-center opacity-50 ${locale ==='fa'? "font-yekan text-sm " : ""}`,{'font-bold shadow bg-primary-accent rounded-full opacity-100': pathname === link.href})}>
                {link.name}
              </Link>)})} 
      </div>
    </nav>
  );
}



