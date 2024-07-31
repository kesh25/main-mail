// private layout 

export default function PrivateLayout({
    children, 
}: Readonly<{
    children: React.ReactNode; 
}>) {

    return (
        <main className="bg-background flex gap-1 w-[100vw] h-screen overflow-hidden">
            {children}
        </main>
    )
};

