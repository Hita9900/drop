
import BottomNav from "@/app/ui/BottomNav.js";


export const metadata = {
    title: "Drop",
    description: "dont make me do metadata now",
};

export default async function RootLayout({ children }) {

    return (
        <>
            {children}
            <BottomNav />
        </>
    );
}

