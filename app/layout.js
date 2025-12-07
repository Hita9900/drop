import "./globals.css";
import { UserProvider } from '@/app/context/UserContext';
import getUserData from '@/app/actions/getUserData';


export const metadata = {
  title: "Drop",
  description: "dont make me do metadata now",
};

export default async function RootLayout({ children }) {
  const profile = await getUserData();

  return (
    <html lang="en">
      <body>
        <div className="flex justify-center">
          <div className="container w-full px-5 pt-5">
            <UserProvider profile={profile}>
              {children}
            </UserProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

