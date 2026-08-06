import { useState } from "react";
import type { TeamMember } from "../../services/teamService";
import { Input, TextArea } from "../ui";

type TeamFormProps = {
  onAdd: (
    member: Omit<TeamMember, "id" | "createdAt">
  ) => void;
};

function TeamForm({ onAdd }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    email: "",
    linkedin: "",
    order: 1,
  });


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

    if (!formData.name || !formData.role) {
      alert("Name and role are required.");
      return;
    }

    onAdd({
      ...formData,
      order: Number(formData.order),
    });

    setFormData({
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      email: "",
      linkedin: "",
      order: 1,
    });
  };


  return (
  <div className="settings-card">

    <h2>Add Team Member</h2>

    <form onSubmit={handleSubmit}>

      <Input
        label="Name"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        label="Role"
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
        label="Image URL"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      {formData.imageUrl && (
  <div className="image-preview">
    <img
      src={formData.imageUrl}
      alt="Preview"
      onError={(e) => {
        e.currentTarget.src =
          "https://placehold.co/300x300?text=Invalid+Image";
      }}
    />
  </div>
)}

      
      <Input
        label="Email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      
      <Input
        label="LinkedIn"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={handleChange}
      />

      <Input
        label="Display Order"
        name="order"
        type="number"
        value={formData.order}
        onChange={handleChange}
      />

      <button type="submit">
        Add Team Member
      </button>

    </form>

  </div>
);

}

export default TeamForm;