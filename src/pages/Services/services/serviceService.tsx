
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import type { Service } from "../type";

const servicesRef = collection(db, "services");

// Get all services
export async function getServices(): Promise<Service[]> {
  const q = query(
    servicesRef,
    orderBy("displayOrder")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Service[];
}

// Add a service
export async function addService(
  service: Omit<Service, "id" | "createdAt">
) {
  await addDoc(servicesRef, {
    ...service,
    createdAt: serverTimestamp(),
  });
}

// Update a service
export async function updateService(
  id: string,
  service: Partial<Service>
) {
  const ref = doc(db, "services", id);

  await updateDoc(ref, {
    ...service,
  });
}

// Delete a service
export async function deleteService(id: string) {
  await deleteDoc(
    doc(db, "services", id)
  );
}
