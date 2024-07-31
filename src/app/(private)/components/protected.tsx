// protect component 
"use client"; 

import React from "react"; 
import Link from 'next/link';
import {useRouter} from "next/navigation"; 
 
import { ChevronLeft } from "lucide-react"; 

import {Button} from "@/components/ui/button";
import {Heading1, Heading3} from "@/components/ui/typography";
import UserPopover from "@/components/popovers/user"; 
import SideMenu from "./nav/side-menu"; 
import ThemeToggle from "@/components/utils/theme-toggle";
import { useAuthUser } from '@/auth/authHooks';

const Protected = ({title, children, backPage}: {title: string, children: React.ReactNode, backPage?: boolean}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [loading, setLoading] = React.useState<boolean>(true); 
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false); 

    const {back} = useRouter(); 

    const auth = useAuthUser(); 
    const user = auth();

    React.useEffect(() => setMounted(true), []); 

    React.useEffect(() => {
        if (!mounted) return

        if (user) setLoggedIn(true); 
        else  setLoggedIn(false); 

        setLoading(false); 
    }, [user, mounted]); 

    if (!mounted) return <Skeleton />
    return (
        <>
            {
                loggedIn && !loading ? (
                    <>
                        <SideMenu />
                        <div className="flex-1 flex-col p-2">
                            <div className="flex w-full justify-between items-center py-2">
                                <div className="flex gap-2 items-center">
                                    {
                                        backPage && (
                                            <Button variant="outline" size="sm" onClick={() => back()}>
                                                <ChevronLeft size={18}/>
                                            </Button>
                                        )
                                    }
                                    <Heading1 className="text-xl lg:text-2xl">{title}</Heading1>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <ThemeToggle 
                                        size="icon"
                                        className="hover:border-background rounded-lg hover:bg-secondary"
                                        variant="outline"
                                    />
                                    <UserPopover />
                                </div>
                            </div>
                            <div className="flex-1 h-[98vh] overflow-auto pb-[5rem]">
                                {children}
                            </div>
                        </div>

                    </>
                ): <></>
            }
            {
                (!loggedIn && !loading) ?
                (
                    <div className="p-2">
                        <Heading3 className="text-sm lg:text-md my-2">You are not authorized to access the page!</Heading3>
                        <Link href="/auth/login" className="text-sm lg:text-md hover:text-active-color">Click here to log in.</Link>
                    </div>
                ): <></>
            }
            {
                loading && <Skeleton />
            }
        </>
    )
};

export default Protected; 

const Skeleton = () => (
    <section className="p-3">
        <Heading3 className="text-sm lg:text-md">Loading.....</Heading3>
    </section>
)