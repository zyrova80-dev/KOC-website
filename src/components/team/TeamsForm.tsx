import type { TeamMember } from "../../services/teamService";
import { useState, useEffect } from "react";
import { Button, Card, Input, TextArea, } from "../ui";

type TeamsFormProps = {
  onAdd: (
    member: Omit<TeamMember, "id" | "createdAt">
  ) => void;

  editingMember?: TeamMember | null;

  onUpdate: (
    id: string,
    member: Partial<TeamMember>
  ) => void;

  cancelEdit: () => void;
};


function TeamsForm({
  onAdd,
  editingMember,
  onUpdate,
  cancelEdit
}: TeamsFormProps) {

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    email: "",
    linkedin: "",
    order: 1,
  });
useEffect(() => {

  if(editingMember){

    setFormData({
      name: editingMember.name,
      role: editingMember.role,
      bio: editingMember.bio,
      imageUrl: editingMember.imageUrl,
      email: editingMember.email,
      linkedin: editingMember.linkedin,
      order: editingMember.order
    });

  }

}, [editingMember]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = (e: React.FormEvent) => {

  e.preventDefault();


  if(!formData.name || !formData.role){
    alert("Name and role are required");
    return;
  }


const memberData = {
  ...formData,
  order: Number(formData.order),
};

if (editingMember?.id) {
  onUpdate(editingMember.id, memberData);

  setFormData({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    email: "",
    linkedin: "",
    order: 1,
  });

  cancelEdit();
} else {
  onAdd(memberData);

  setFormData({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    email: "",
    linkedin: "",
    order: 1,
  });
}


};


  return (
    <Card title={editingMember ? "Edit Team Member" : "Add Team Member"}>
 <form onSubmit={handleSubmit}>

      <Input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        name="role"
        placeholder="Position / Role"
        value={formData.role}
        onChange={handleChange}
      />

      <TextArea
        label="Bio"
        name="bio"
        placeholder="Short Biography"
        value={formData.bio}
        onChange={handleChange}
      />

      <Input
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <Input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>LinkedIn</label>
      <Input
        name="linkedin"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={handleChange}
      />

      <label>Display Order</label>
      <Input
        name="order"
        type="number"
        value={formData.order}
        onChange={handleChange}
      />

      <Button type="submit">
        {editingMember ? "Save Changes" : "Add Team Member"}
      </Button>
      
    {editingMember && (
  <Button
    type="button"
    onClick={() => {
      setFormData({
        name: "",
        role: "",
        bio: "",
        imageUrl: "",
        email: "",
        linkedin: "",
        order: 1,
      });

      cancelEdit();
    }}
  >
    Cancel
  </Button>
)}
    </form>
</Card>

);

}

export default TeamsForm;