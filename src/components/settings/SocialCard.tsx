import type { CompanySettings } from "../../services/settingsService";

interface SocialCardProps {
  settings: CompanySettings;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function SocialCard({
  settings,
  onChange,
}: SocialCardProps) {
  return (
    <div className="settings-card">
      <h2>Social Media</h2>

      <label>Facebook</label>
      <input
        type="text"
        name="facebook"
        value={settings.facebook}
        onChange={onChange}
      />

      <label>Instagram</label>
      <input
        type="text"
        name="instagram"
        value={settings.instagram}
        onChange={onChange}
      />

      <label>LinkedIn</label>
      <input
        type="text"
        name="linkedin"
        value={settings.linkedin}
        onChange={onChange}
      />

      <label>X</label>
      <input
        type="text"
        name="x"
        value={settings.x}
        onChange={onChange}
      />

      <label>WhatsApp</label>
      <input
        type="text"
        name="whatsapp"
        value={settings.whatsapp}
        onChange={onChange}
      />
    </div>
  );
}