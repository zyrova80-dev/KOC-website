import { useEffect, useState } from "react";
import { 
    getCompanySettings,
    saveCompanySettings,
} from "../services/settingsService";
import type { CompanySettings } from "../services/settingsService";
import CompanyCard from "../components/settings/CompanyCard";
import Sidebar from "../components/sidebar";
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/settings/ContactCard";
import "../styles/settings.css";
import SocialCard from "../components/settings/SocialCard";
import BrandingCard from "../components/settings/BrandingCard";
import BusinessCard from "../components/settings/BusinessCard";

export function Settings () {
    const navigate = useNavigate();
    const [settings, setSettings] =
    useState<CompanySettings>({
          companyName: "",
          tagline: "",
          description: "",
          email: "",
          phone1: "",
          phone2: "",
          address: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          x: "",
          whatsapp: "",
          logo: "",
          businessHours: "",
          copyright: "",
    });

          const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate("/");
        } catch (error) {
          console.error("Logout error:", error);
        }
      };

    const [loading, setloading] = 
    useState(true);
    const [saving, setSaving] =
    useState(false);

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await getCompanySettings();

                if (data) {
                    setSettings(data);
                }
            }catch (error) {
                console.error(error);
            } finally {
                setloading(false);
            }
        }

        loadSettings();
    }, []);

    const handleChange = (
        e: 
        React.ChangeEvent<HTMLInputElement |
        HTMLTextAreaElement>
    ) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try { 
            setSaving(true);

            await
            saveCompanySettings(settings);

            alert("Settings saved successfully!");
        } catch (error) {
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

return (
  <>
    <Sidebar onLogout={handleLogout} />

    <div className="settings-page">
      <h1 className="settings-title">Website Settings</h1>

<CompanyCard
  settings={settings}
  onChange={handleChange}
/>

<ContactCard
  settings={settings}
  onChange={handleChange}
/>

<SocialCard
  settings={settings}
  onChange={handleChange}
/>

<BrandingCard
settings={settings}
onChange={handleChange}
/>

<BusinessCard
settings={settings}
onChange={handleChange} />     

      <button
        className="save-btn"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  </>
  
);
}

export default Settings;