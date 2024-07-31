// help sheet
"use client";

import React from "react";

import { Upload, Paperclip, RefreshCcw, Trash2 } from "lucide-react";

import AppLinkButton from "../common/app-link-button";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import SheetContainer from "./container";
import { Heading3, Paragraph } from "../ui/typography";
import { Separator } from "../ui/separator";

import GenerateIcon from "../utils/generate-icon";

import { usersFileUploading } from "./add-users-fn";
import { useSearch } from "@/hooks";
import { validateEmail } from "@/utils/validation";
import { addUserToDomain } from "@/lib/api-calls/domains";
import { createToast } from "@/utils/toast";

const UsersSheet = ({ domain, fn }: { domain: string, fn: any }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [users, setUsers] = React.useState<AddUsersTableType[]>([])
    const [data, setData] = React.useState<any>([]);
    const [fileName, setFileName] = React.useState<string>("");
    const [fileExt, setFileExt] = React.useState<string>("");
    const [fileSize, setFileSize] = React.useState<number>(0);

    const searchParams = useSearch();
    const d = searchParams?.get("d") || ""

    const handleFileSelect = () => {
        inputRef.current?.click();
    }

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            let ext = file.name.split('.').pop();
            setFileName(file.name);
            setFileExt(ext);
            setFileSize(file.size);
        }

        usersFileUploading(e, setData);


    }

    const handleRecordParsing = () => {
        // let fields = ["name", "email", "phone"]; 

        let cleaned: AddUsersTableType[] = [];

        // loop to purge the data from the EXCEL or CSV
        for (let i = 0; i < data.length; i++) {
            let curr = data[i];
            let keys = Object.keys(curr);
            keys = keys.map(key => key.toLowerCase());
            // check to see if required fields are present
            if (
                keys.includes("name") &&
                keys.includes("email") &&
                keys.includes("phone")
            ) {
                let rawEmail = curr.email || curr.EMAIL || curr.Email;
                rawEmail = validateEmail(rawEmail) ? rawEmail.split("@")[0] : rawEmail;

                let email = `${rawEmail.toLowerCase()}@${d}`;
                let phone = curr.phone || curr.PHONE || curr.Phone;
                phone = phone.startsWith(0) ? "254" + phone.slice(1,) : phone;
                phone = phone.startsWith("+") ? phone : "+" + phone;


                // confirm if user with similar number is present
                let confirm = cleaned.filter(user => user.phone === phone);
                if (confirm.length === 0) {
                    cleaned.push({
                        name: curr.name || curr.NAME || curr.Name,
                        email,
                        phone,
                    })
                }
            }
        };

        setUsers(cleaned)
    }

    const handleAddUsers = async () => {
        setLoading(true); 

        let res = await addUserToDomain(domain, {users}, true); 

        if (res) {
            createToast("success", "Users have been added successfully");
            fn(); 
            setUsers([]);
            setData([]);
        
        };

        setLoading(false); 
    }
    return (
        <SheetContainer
            trigger={
                <AppLinkButton
                    size="sm"
                    type="default"
                    className="gap-2 items-center rounded-full"
                >
                    <Paperclip size={18} /> Add Users
                </AppLinkButton>
            }
            width={"w-full lg:max-w-[30vw]"}
        >
            <Heading3 className="text-md lg:text-lg mt-3">Add Multiple Users</Heading3>
            <Paragraph className="-mt-3 text-sm text-gray-500">You can add multiple users by uploading an excel or CSV file. Make sure the user has an email that matches the domain, a valid phone number, and their name.</Paragraph>
            <div className="min-h-[80vh] flex flex-col pb-[5rem] overflow-auto">
                {
                    data.length > 0 ? (
                        <>
                            {
                                users.length === 0 && (
                                    <>
                                        <Paragraph className="my-2">A file has been uploaded. To read the content, click on the parse buttons below. <span className="font-extrabold">NB: </span> Missing records indicate invalid entries.</Paragraph>
                                        <div className="my-2">
                                            <GenerateIcon
                                                type={fileExt.includes("csv") ? "CSV" : "excel"}
                                                title={fileName}
                                                size={fileSize}
                                            />
                                        </div>
                                        <Button onClick={handleRecordParsing}>
                                            Parse Records
                                        </Button>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <Card
                            className="cursor-pointer hover:border-main-color duration-700 my-3 p-3 w-full h-[150px] flex flex-col justify-center items-center border-dashed"
                            onClick={handleFileSelect}
                        >
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                className="hidden"
                                ref={inputRef}
                                onChange={handleFileUpload}
                            />
                            <Upload size={18} />

                            <Paragraph>Click to upload file</Paragraph>
                        </Card>
                    )
                }
                {
                    users.length > 0 && (
                        <>
                            <AddUsersTable users={users} setUsers={setUsers} setData={setData} />
                            <Button className="my-4" onClick={handleAddUsers} disabled={loading}>
                                Add Users
                            </Button>
                        </>
                    )
                }

            </div>
        </SheetContainer>
    )
};

export default UsersSheet;

type AddUsersTableType = {
    name: string;
    email: string;
    phone: string;
}

// add users table 
const AddUsersTable = (
    { users, setUsers, setData }:
        {
            users: AddUsersTableType[];
            setUsers: React.Dispatch<AddUsersTableType[]>;
            setData: React.Dispatch<any>
        }) => (
    <div className="">
        <Separator />
        <div className="flex items-center justify-between">
            <Heading3 className="text-sm lg:text-md my-3">Users to Add: {users.length}</Heading3>
            <Button variant={"secondary"} size="sm" onClick={() => { setUsers([]); setData([]) }}>
                <RefreshCcw size={18} />
            </Button>
        </div>
        <Separator />

        <div className="grid grid-cols-3 my-2 border-r border-l px-1">
            <Paragraph className="font-bold text-xs lg:text-sm">Name</Paragraph>
            <Paragraph className="font-bold text-xs lg:text-sm">Email</Paragraph>
            <Paragraph className="font-bold text-xs lg:text-sm">Phone</Paragraph>
        </div>
        <Separator />
        <div className="border-r border-l px-2">
            {
                users.map((user, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-3 my-2 items-center" >
                            <Paragraph>{index + 1}. {user.name}</Paragraph>
                            <Paragraph>{user.email}</Paragraph>
                            <Paragraph className="flex gap-5 items-center">
                                {user.phone}
                                <span
                                    className="cursor-pointer text-white hover:text-destructive duration-700 hover:bg-secondary bg-destructive p-2 rounded-sm"
                                    onClick={() => {
                                        let newUsers = [];

                                        for (let i = 0; i < users.length; i++) {
                                            if (i !== index) newUsers.push(users[i]);
                                        }

                                        setUsers(newUsers);
                                    }}
                                >
                                    <Trash2 size={15} />
                                </span>
                            </Paragraph>
                        </div>
                        <Separator />
                    </div>
                ))
            }
        </div>
    </div>
)