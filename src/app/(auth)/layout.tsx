import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { Toaster } from "react-hot-toast";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <html lang="en">
            <Toaster />
            <body>{children}</body>
        </html>
    );
}
