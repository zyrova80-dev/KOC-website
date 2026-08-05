import type { CompanySettings } from "../../services/settingsService";

interface BusinessCardProps {
  settings: CompanySettings;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function BusinessCard({
  settings,
  onChange,
}: BusinessCardProps) {
  return (
    <div className="settings-card">
      <h2>Business Information</h2>

      <label>Business Hours</label>
      <textarea
        name="businessHours"
        value={settings.businessHours}
        onChange={onChange}
        rows={3}
      />

      <label>Footer Copyright</label>
      <input
        type="text"
        name="copyright"
        value={settings.copyright}
        onChange={onChange}
      />
    </div>
  );
}