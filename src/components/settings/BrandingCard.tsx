import type { CompanySettings } from "../../services/settingsService";
import { Card } from "../ui";

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
    <Card title="Branding">

      <label>Logo URL</label>
      <input
        type="text"
        name="logo"
        value={settings.logo}
        onChange={onChange}
      />
    </Card>
  );
}