import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import TeamsForm from "../components/team/TeamsForm";
import TeamList from "../components/team/TeamList";
import "../styles/team.css";
import {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
    updateTeamMember,
} from "../services/teamService";

import type { TeamMember } from "../services/teamService";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ConfirmModal from "../components/ConfirmModal";
import { SearchBar } from "../components/ui";

function Team() {
  
  const navigate = useNavigate();

  const [members, setMembers] = useState<TeamMember[]>([]);
const [editingMember, setEditingMember] =
  useState<TeamMember | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const fetchMembers = async () => {
    try {
      const data = await getTeamMembers();
      setMembers(data);
    } catch (error) {
      console.error(
        "Failed to fetch team members:",
        error
      );
    }
  };
  const handleEdit = (
  member: TeamMember
) => {

  setEditingMember(member);

};

  useEffect(() => {
    fetchMembers();
  }, []);



  const handleAdd = async (
    member: Omit<TeamMember, "id" | "createdAt">
  ) => {

    try {

      await addTeamMember(member);

      alert(
        "Team member added successfully!"
      );

      fetchMembers();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add team member"
      );

    }
  };

  const handleUpdate = async (
  id: string,
  member: Partial<TeamMember>
) => {

  try {

    await updateTeamMember(id, member);

    alert("Team member updated successfully!");

    setEditingMember(null);

    fetchMembers();

  } catch (error) {

    console.error(error);

    alert("Failed to update team member");

  }

};



const handleDelete = async (id: string) => {
  try {
    await deleteTeamMember(id);

    fetchMembers();

  } catch (error) {

    console.error(error);

    alert("Failed to delete team member");

  }
};

  const [search, setSearch] = useState("");
  const filteredMembers = members.filter((member) =>
  member.name.toLowerCase().includes(search.toLowerCase()) ||
  member.role.toLowerCase().includes(search.toLowerCase())
);

const [memberToDelete, setMemberToDelete] =
  useState<TeamMember | null>(null);

  return (
    <>
      <Sidebar onLogout={handleLogout} />


      <div className="team-page">

        <h1>
          Team Management
        </h1>
         <div className="search-bar">
  <SearchBar
    placeholder="Search team members..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

        <TeamsForm
          onAdd={handleAdd}
          editingMember={editingMember}
          onUpdate={handleUpdate}
          cancelEdit={() => setEditingMember(null)}
        />


        <hr />


        <TeamList
          members={filteredMembers}
          onDelete={(id) => {
  const member = members.find((m) => m.id === id);

  if (member) {
    setMemberToDelete(member);
  }
}}
          onEdit={handleEdit}
        />

      </div>
    <ConfirmModal
  isOpen={memberToDelete !== null}
  title="Delete Team Member"
  message={
    memberToDelete
      ? `Are you sure you want to delete "${memberToDelete.name}"? This action cannot be undone.`
      : ""
  }
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => setMemberToDelete(null)}
  onConfirm={async () => {
    if (memberToDelete?.id) {
      await handleDelete(memberToDelete.id);
      setMemberToDelete(null);
    }
  }}
/>
    </>
  );
}


export default Team;