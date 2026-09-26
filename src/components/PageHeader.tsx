import React from "react";
import "./PageHeader.css";
import { Button } from "./ui";

type PageHeaderProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick: ( ) => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    buttonText,
    onButtonClick,
}) =>{
    return (
        <div className="page-holder">
            <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
            <div>
                {buttonText && (
                    <Button
                    variant="primary"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;