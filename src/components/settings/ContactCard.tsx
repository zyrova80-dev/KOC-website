import type { CompanySettings } from "../../services/settingsService";
import { Card } from "../ui";

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
    <Card title="Contact Information">
      

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={settings.email}
        onChange={onChange}
      />

      <label>Phone 1</label>
      <input
        type="text"
        name="phone1"
        value={settings.phone1}
        onChange={onChange}
      />

      <label>Phone 2</label>
      <input
        type="text"
        name="phone2"
        value={settings.phone2}
        onChange={onChange}
      />

      <label>Address</label>
      <textarea
        name="address"
        value={settings.address}
        onChange={onChange}
        rows={3}
      />
    </Card>
  );
}