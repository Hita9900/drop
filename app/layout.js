import "./globals.css";
import BottomNav from "@/app/ui/BottomNav.js";


export const metadata = {
  title: "Drop",
  description: "dont make me do metadata now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center">
          <div className="container w-full px-5 pt-5">
            {children}
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
