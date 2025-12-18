import "./globals.css";
import { UserProvider } from '@/app/context/UserContext';
import getUserData from '@/app/actions/getUserData';
import { Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { montserrat, wildworld, platinum, yekan } from '@/public/fonts/fonts';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';


export const metadata = {
  title: "Drop",
  description: "dont make me do metadata now",
};

export default async function RootLayout({ children }) {
  const profile = await getUserData();
  const locale = await getLocale();
  const dir = locale.startsWith('fa') ? 'rtl' : 'ltr';

  return (
    <html dir={dir} lang="en" className={`${montserrat.variable} ${wildworld.variable} ${platinum.variable} ${yekan.variable}`}>
      <body className="font-montserrat">
        <div className="flex justify-center">
          <div className="container w-full px-5 pt-5 pb-32">
            <NextIntlClientProvider>

              <UserProvider profile={profile}>
                {children}
              </UserProvider>

            </NextIntlClientProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Flip}
            />
          </div>
        </div>
      </body>
    </html>
  );
}

