'use client';

import {useRouter, usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const changeLocale = (newLocale) => {
    // Set cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    // Refresh the page to reload with new locale
    router.refresh();
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => changeLocale(e.target.value)}
      className="bg-primary-dark"
    >
      <option value="en">English</option>
      <option value="fa">فارسی</option>
    </select>
  );
}