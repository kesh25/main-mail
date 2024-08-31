"use client"; 

import React from "react"; 

import SheetContainer from "./container";
import AppLinkButton from "../common/app-link-button";


const APIDocs = () => {

    return (
        <SheetContainer
            trigger={
                <AppLinkButton
                    size="sm"
                    type="outline"
                    className="text-xs lg:text-xs gap-2 items-center rounded-lg"
                >
                    Read Docs
                </AppLinkButton>
            }
            width="w-full lg:max-w-[30vw]"
        >
            <></>
        </SheetContainer>
    )
};

export default APIDocs; 