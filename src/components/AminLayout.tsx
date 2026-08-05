import Sidebar from "./sidebar";
import { signOut } from "firebase/auth";
import { useNavigate} from "react-router-dom";
import React from "react";
import { auth } from "../firebase"

type AdminLayoutProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

function AdminLayout ({
    title,
    subtitle,
    children,
}: AdminLayoutProps) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="dashboard">
            <Sidebar onLogout={handleLogout} />

            <main className="main-content">
                <header className="header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </header>
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;