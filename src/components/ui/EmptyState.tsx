import { FaFolderOpen } from "react-icons/fa";
import "../../styles/ui/emptyState.css";

interface EmptyStateProps{
    title:string;
    description:string;
    action?:React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    action
}:EmptyStateProps){

    return(

        <div className="empty-state">

            <div className="empty-icon">
                <FaFolderOpen/>
            </div>

            <h3 className="empty-title">
                {title}
            </h3>

            <p className="empty-description">
                {description}
            </p>

            {action && (
                <div className="empty-actions">
                    {action}
                </div>
            )}

        </div>

    );

}