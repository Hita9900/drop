import "./globals.css";
import { UserProvider } from '@/app/context/UserContext';
import getUserData from '@/app/actions/getUserData';
import { Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { montserrat, wildworld } from '@/public/fonts/fonts';


export const metadata = {
  title: "Drop",
  description: "dont make me do metadata now",
};

export default async function RootLayout({ children }) {
  const profile = await getUserData();

  return (
    <html lang="en" className={`${montserrat.variable} ${wildworld.variable}`}>
      <body className="font-montserrat">
        <div className="flex justify-center">
          <div className="container w-full px-5 pt-5 pb-32">
            <UserProvider profile={profile}>
              {children}
            </UserProvider>
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

