import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";


export type TeamMember = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email: string;
  linkedin: string;
  order: number;
  createdAt?: Timestamp;
};


// Get all team members
export async function getTeamMembers() {
 const q = query(
  collection(db, "teamMembers"),
  orderBy("order", "asc")
);

const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[];
}


// Add team member
export async function addTeamMember(
  member: Omit<TeamMember, "id" | "createdAt">
) {
  await addDoc(collection(db, "teamMembers"), {
    ...member,
    createdAt: Timestamp.now(),
  });
}


// Delete team member
export async function deleteTeamMember(
  id: string
) {
  await deleteDoc(
    doc(db, "teamMembers", id)
  );
}


// Update team member
export async function updateTeamMember(
  id: string,
  member: Partial<TeamMember>
) {
  await updateDoc(
    doc(db, "teamMembers", id),
    member
  );
}