'use client';
import { useState } from 'react';
import { Link, Menu } from 'lucide-react';
import LanguageSwitcher from '../actions/LanguageSwitcher';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';

export default function Sidebar() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('HomePage');

  return (
    <div className={isOpen ? `relative flex flex-col ${locale === 'fa'? 'mb-[-81]': 'mb-[-80]'}` : "relative flex flex-col"}>
      {/* Button - toggles dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white px-3 py-3 hover:opacity-50 self-end"
      >
        <Menu size={30} />
      </button>

      {/* Dropdown - shows only when isOpen is true */}
      {isOpen && (
        <div className="w-full text-primary-light bg-primary-dark rounded-md shadow-lg overflow-hidden">
          <a href="/" className={`block px-4 py-2 text-gray-800 hover:bg-primary-accent-60 ${ locale ==='fa'? 'font-yekan':''}`}>{t('Home')}</a>
          <span className={`block px-4 py-2 text-gray-800 text-primary-light ${ locale ==='fa'? 'font-yekan':''}`}><LanguageSwitcher/></span>
        </div>
      )}

      
    </div>
  );
}