import type { CompanySettings } from "../../services/settingsService";
import { Card } from "../ui";

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
    <Card title="Business Information">

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

</Card>

  );
}