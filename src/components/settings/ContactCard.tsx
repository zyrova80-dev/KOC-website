import type { CompanySettings } from "../../services/settingsService";
import { Card, Input, TextArea } from "../ui";

interface ContactCardProps {
  settings: CompanySettings;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ContactCard({
  settings,
  onChange,
}: ContactCardProps) {
  return (
    <Card>
      <h3>Contact Information</h3>

      <Input
        label="Email"
        type="email"
        name="email"
        value={settings.email}
        onChange={onChange}
        placeholder="Enter email address"
      />

      <Input
        label="Phone 1"
        type="text"
        name="phone1"
        value={settings.phone1}
        onChange={onChange}
        placeholder="Enter primary phone number"
      />

      <Input
        label="Phone 2"
        type="text"
        name="phone2"
        value={settings.phone2}
        onChange={onChange}
        placeholder="Enter secondary phone number"
      />

      <TextArea
        label="Address"
        name="address"
        value={settings.address}
        onChange={onChange}
        placeholder="Enter company address"
        rows={3}
      />
    </Card>
  );
}