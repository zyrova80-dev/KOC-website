import type { CompanySettings } from "../../services/settingsService";

interface BrandingCardProps {
  settings: CompanySettings;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function BrandingCard({
  settings,
  onChange,
}: BrandingCardProps) {
  return (
    <div className="settings-card">
      <h2>Branding</h2>

      <label>Logo URL</label>
      <input
        type="text"
        name="logo"
        value={settings.logo}
        onChange={onChange}
      />
    </div>
  );
}