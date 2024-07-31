// logo 
import { AppImage } from "@/components";
import {images} from "@/assets"; 
import { Paragraph } from "@/components/ui/typography";

const Logo = ({showText = true}: {showText: boolean}) => (
    <div className="flex gap-2 items-center cursor-pointer hover:text-main-color duration-700">
        <AppImage 
            src={images.logo}
            alt="logo"
            title={"logo"}
            width={40}
            height={30}
            objectFit="contain"
            nonBlur={true}
        />
        {showText && <Paragraph className="text-md lg:text-xl font-extrabold">Vu.Mail</Paragraph>}
    </div>
);

export default Logo; 