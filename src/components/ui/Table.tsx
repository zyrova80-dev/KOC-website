import "../../styles/ui/table.css";

interface TableProps {
    children: React.ReactNode;
}

export default function Table({
    children
}: TableProps) {

    return (

        <div className="table-container">

            <table className="table">

                {children}

            </table>

        </div>

    );

}