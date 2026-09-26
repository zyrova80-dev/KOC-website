import type { CompanySettings } from "../../services/settingsService";
import { Card, Input, TextArea } from "../ui";

interface CompanyCardProps {
    settings: CompanySettings;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

export default function CompanyCard({
    settings,
    onChange,
}: CompanyCardProps) {
    return (
        <Card>
            <h2>Company Information</h2>

            <Input
                label="Company Name"
                name="companyName"
                type="text"
                value={settings.companyName}
                onChange={onChange}
                placeholder="Enter company name"
            />

            <Input
                label="Tagline"
                name="tagline"
                type="text"
                value={settings.tagline}
                onChange={onChange}
                placeholder="Enter company tagline"
            />

            <TextArea
                label="Description"
                name="description"
                value={settings.description}
                onChange={onChange}
                placeholder="Enter company description"
                rows={5}
            />
        </Card>
    );
}