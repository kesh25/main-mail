"use client"; 
import React from 'react';
import {ChevronUp} from 'lucide-react'; 

import {Button} from "@/components/ui/button"; 

const ScrollToTop = ({}) => {
    const [mounted, setMounted] = React.useState(false); 
    const [show, setShow] = React.useState(false); 

    React.useEffect(() => {setMounted(true)}, []); 
    React.useEffect(() => {
        if (!mounted) return; 

        let scrollListener = () => {
            let yOffset = Math.floor(window.pageYOffset); 
            if (yOffset > 300) setShow(true)
            else setShow(false)
        }

        window.addEventListener("scroll", scrollListener); 
        return () => {
            window.removeEventListener("scroll", scrollListener)
        }
    }, [mounted])
    if (!mounted) return null; 

    const scroll = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); 
    }
    return (
        <>
            {
                show && (
                    <Button 
                        variant='outline' 
                        size='icon' 
                        className="rounded-full fixed bottom-0 right-0 m-8" 
                        onClick={scroll}
                    >
                        <ChevronUp />
                    </Button>
                )
            }
        </>
    )
}

export default ScrollToTop; 