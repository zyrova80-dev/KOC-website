import type { CompanySettings } from "../../services/settingsService";
import { Card, Input } from "../ui";

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
    <Card>
      <h3>Social Media</h3>

      <Input
        label="Facebook"
        type="text"
        name="facebook"
        value={settings.facebook}
        onChange={onChange}
        placeholder="Facebook URL"
      />

      <Input
        label="Instagram"
        type="text"
        name="instagram"
        value={settings.instagram}
        onChange={onChange}
        placeholder="Instagram URL"
      />

      <Input
        label="LinkedIn"
        type="text"
        name="linkedin"
        value={settings.linkedin}
        onChange={onChange}
        placeholder="LinkedIn URL"
      />

      <Input
        label="X"
        type="text"
        name="x"
        value={settings.x}
        onChange={onChange}
        placeholder="X profile URL"
      />

      <Input
        label="WhatsApp"
        type="text"
        name="whatsapp"
        value={settings.whatsapp}
        onChange={onChange}
        placeholder="WhatsApp number or link"
      />
    </Card>
  );
}