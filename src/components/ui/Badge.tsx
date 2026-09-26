import "../../styles/ui/badge.css";

type BadgeVariant =
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "secondary";

interface BadgeProps{
    children:React.ReactNode;
    variant?:BadgeVariant;
}

export default function Badge({
    children,
    variant="primary"
}:BadgeProps){

    return(

        <span className={`badge badge-${variant}`}>
            {children}
        </span>

    );

}