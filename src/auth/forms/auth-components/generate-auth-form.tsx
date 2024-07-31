import { FormField } from "@/components/ui/form";
import FormTitle from "@/components/forms/components/form-title"; 
import {Email, Name, Password, Phone} from "."; 
// import Loader from "@/utils/loader"; 
import React from "react";

const GenerateAuthPageForm = ({
    activated, message, form, screen, loading
}: {
    activated?: boolean, message?: string, form: any, screen: string, loading: boolean
}) => {

    return (
        <>
            {screen === "login" && <Login form={form} loading={loading}/>}
            {screen === "register" && <Register form={form} loading={loading}/>}
            {screen === "forgot" && <Forgot form={form} loading={loading}/>}
            {screen === "reset" && <Reset form={form} loading={loading}/>}
            {screen === "welcome" && (
                <Welcome 
                    form={form} 
                    loading={loading}
                    activated={activated}
                    message={message}
                />
            )}
        </>
    )
}

export default GenerateAuthPageForm; 

// components 
interface AuthProps {
    form: any; 
    activated?: boolean; 
    message?: string; 
    loading: boolean; 
}
const Login: React.FC<AuthProps> = ({form, loading}) => {

    return (
        <>
            <FormTitle title="Email"/>
            <FormField
                control={form.control}
                name='email'
                render={({ field }: {field: object}) => <Email loading={loading} field={{...field}} />}
            />
            <FormTitle title="Password"/>
            <FormField
                disabled={loading}
                control={form.control}
                name='password'
                render={({ field }: {field: object}) => <Password loading={loading} field={{...field}} />}
            />
        </>
    )
}

const Register: React.FC<AuthProps> = ({form, loading}) => {
    return (
        <>
            <FormTitle title="Email"/>
            <FormField
                control={form.control}
                name='email'
                render={({ field }: {field: object}) => <Email loading={loading} field={{...field}} />}
            />
            <FormTitle title="Full Name"/>
            <FormField
                control={form.control}
                name='name'
                render={({ field }: {field: object}) => <Name loading={loading} field={{...field}} />}
            />
            <FormTitle title="Password"/>
            <FormField
                control={form.control}
                name='password'
                render={({ field }: {field: object}) => <Password loading={loading} field={{...field}} />}
            />
            <FormTitle title="Confirm Password"/>
            <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }: {field: object}) => <Password loading={loading} field={{...field}} />}
            />

        </>
    )
}

const Forgot: React.FC<AuthProps> = ({form, loading}) => {
    return (
        <>

            <FormTitle title="Email"/>
            <FormField
                control={form.control}
                name='email'
                render={({ field }: {field: object}) => <Email loading={loading} field={{...field}} />}
            />
        </>
    )
}

const Reset: React.FC<AuthProps> = ({form, loading}) => {
    return (
        <>
            <FormTitle title="Password"/>
            <FormField
                control={form.control}
                name='password'
                render={({ field }: {field: object}) => <Password loading={loading} field={{...field}} />}
            />
            <FormTitle title="Confirm Password"/>
            <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }: {field: object}) => <Password loading={loading} field={{...field}} />}
            />
        </>
    )
}

const Welcome: React.FC<AuthProps> = ({form, loading, activated, message}) => {
    return (
        <>
            {
                !loading && !activated && (
                    <>
                        <h4 className="text-sm my-4">{message}</h4>
                        <FormField
                            disabled={loading}
                            control={form.control}
                            name='email'
                            render={({ field }: {field: object}) => <Email loading={loading} field={{...field}} />}
                        />
                    </>
                )
            }
            {
                !loading && activated && (
                    <div>
                        <h4>Activation was successful, redirecting...</h4>
                    </div>
                )
            }
            {loading && (
                 <div>
                    <h4>Loading...</h4>
                </div>
            )}
        </>
    )
}