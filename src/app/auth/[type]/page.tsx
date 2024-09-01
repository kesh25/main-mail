// auth page
"use client"; 

import {useRouter} from "next/navigation"; 
import {ChevronLeft, Copyright} from "lucide-react"; 

import AuthForm from "@/auth/forms";
import Logo from "@/components/utils/logo"; 
import { Separator } from "@/components/ui/separator"; 
import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card"; 
import { Heading1 } from "@/components/ui/typography"; 

const Auth = ({params}: {params: {type: ScreenType}}) => {
    const {back} = useRouter(); 

    return (
        <>
            <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center px-2">
                <Logo showText={false}/>
                <Card className="w-full lg:max-w-[450px] flex flex-col gap-2 my-2 p-2 px-3">
                    <div  className="relative w-full flex items-center justify-center py-2">
                        <Button variant="ghost" onClick={() => back()} className="absolute left-0 top-0 mt-1">
                            <ChevronLeft size={23}/>
                        </Button>
                        <Heading1 className="text-center text-lg lg:text-xl capitalize">{params.type}</Heading1>
                    </div>
                    <Separator />

                    <AuthForm
                        buttonText="Submit"
                        screen={params.type}
                        values={generateValues(params.type)}
                        className="w-full"
                    />
                </Card>
                <footer className="text-sm lg:text-md py-2 w-full flex justify-center items-center">
                    Copyright {new Date().getFullYear()}&nbsp; <Copyright size={18}/>&nbsp; Vu.Mail
                </footer>
            </main>
        </>
    )
};

export default Auth; 

type ScreenType = "login" | "register" | "forgot" | "reset" | "welcome"; 

let generateValues = (screen: ScreenType) => {
    let values: any; 

    switch(screen) {
        case "login": 
            values={email: "", password: ""}
            break; 
        case "register": 
            values = {
                email: "", name: "", password: "", passwordConfirm: ""
            };
            break; 
        case "forgot": 
            values = {email: ""};
            break; 
        case "reset": 
            values = {password: "", passwordConfirm: ""};
            break; 
        case "welcome": 
            values = {email: ""}; 
            break; 

        default: 
            values = {}; 

        return values; 

    }

    return values
}