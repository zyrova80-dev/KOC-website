import React from "react";
import "./PageHeader.css";

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
                    <button
                        className="page-header-button"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;