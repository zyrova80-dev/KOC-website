import type { ReactNode } from "react";


type DashboardCardProps = {
    title: string;
    value: number;
    icon: ReactNode;
};

function DashboardCard({title,
value, icon }: DashboardCardProps){
    return (
        <div className="card">
            <div className="card-icon">{icon}</div>
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}

export default DashboardCard;