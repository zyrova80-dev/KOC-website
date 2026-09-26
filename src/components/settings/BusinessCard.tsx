import type { CompanySettings } from "../../services/settingsService";
import { Card, Input, TextArea } from "../ui";

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
    <Card>
      <TextArea
        label="Business Hours"
        name="businessHours"
        value={settings.businessHours}
        onChange={onChange}
        placeholder="Enter business hours"
        rows={3}
      />

      <Input
        label="Footer Copyright"
        type="text"
        name="copyright"
        value={settings.copyright}
        onChange={onChange}
        placeholder="Enter footer copyright"
      />
    </Card>
  );
}