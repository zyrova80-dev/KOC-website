import { 
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export interface CompanySettings {
    companyName: string;
    tagline: string;
    description: string;
    email: string;
    phone1: string;
    phone2: string;
    address: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    x: string;
    whatsapp: string;
    logo: string;
    businessHours: string;
    copyright: string;
}

const settingsRef = doc(db, 
    "settings", "company"
);

export async function getCompanySettings() {
    const snapshot = await getDoc(settingsRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data() as CompanySettings;
}

export async function saveCompanySettings(data: CompanySettings) {
    await setDoc(settingsRef, {
        ...data,
        updateAt: serverTimestamp()
    });
}
