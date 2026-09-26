import type { CompanySettings } from "../../services/settingsService";
import { Card, Input } from "../ui";

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
    <Card>
      <h3>Branding</h3>

      <Input
        label="Logo URL"
        type="text"
        name="logo"
        value={settings.logo}
        onChange={onChange}
        placeholder="Enter logo URL"
      />
    </Card>
  );
}