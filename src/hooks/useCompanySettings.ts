import { useEffect, useState } from "react";
import {
  getCompanySettings,
  type CompanySettings,
} from "../services/settingsService";

export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getCompanySettings();

        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to load company settings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}