import type { CompanySettings } from "../../services/settingsService";

interface CompanyCardProps {
    settings: CompanySettings;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function CompanyCard({ settings, onChange }: CompanyCardProps) {
    return (
        <div className="settings-card">
            <h2>Company Information</h2>

            <label>Company Name</label>
            <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={onChange}
            />

            <label>Tagline</label>
            <input
             type="text"
              name="tagline"
              value={settings.tagline}
              onChange={onChange} />

              <label>Description</label>
              <textarea
               name="description"
               value={settings.description}
               onChange={onChange}
               rows={5}
               />
        </div>
    )
}