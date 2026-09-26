import { useState, useEffect } from "react";
import { Button, Card, Input, TextArea } from "../../../components/ui";
import type { Service } from "../type";


type ServiceFormProps = {
  onAdd: (service: Omit<Service, "id" | "createdAt">) => void;

  editingService?: Service | null;

  onUpdate: (
    id: string,
    service: Partial<Service>
  ) => void;

  cancelEdit: () => void;
};

function ServiceForm({
  onAdd,
  editingService,
  onUpdate,
  cancelEdit,
}: ServiceFormProps) {

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    icon: "",
    displayOrder: 1,
    featured: false,
    active: true,
  });

  useEffect(() => {

    if (editingService) {

      setFormData({
        title: editingService.title,
        shortDescription: editingService.shortDescription,
        fullDescription: editingService.fullDescription,
        icon: editingService.icon,
        displayOrder: editingService.displayOrder,
        featured: editingService.featured,
        active: editingService.active,
      });

    }

  }, [editingService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    });

  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });

  };

  const resetForm = () => {

    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      icon: "",
      displayOrder: 1,
      featured: false,
      active: true,
    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!formData.title) {

      alert("Service title is required.");

      return;

    }

    if (editingService?.id) {

      onUpdate(
        editingService.id,
        formData
      );

      resetForm();

      cancelEdit();

    } else {

      onAdd(formData);

      resetForm();

    }

  };

  return (

    <Card>
      <h2>
        {editingService ? "Edit Service" : "Add Service"}
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextArea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <TextArea
          name="fullDescription"
          placeholder="Full Description"
          value={formData.fullDescription}
          onChange={handleChange}
        />

        <Input
          name="icon"
          placeholder="React Icon Name"
          value={formData.icon}
          onChange={handleChange}
        />

        <Input
          name="displayOrder"
          type="number"
          value={formData.displayOrder}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleCheckboxChange}
          />

          Featured
        </label>

        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleCheckboxChange}
          />

          Active
        </label>

        <Button type="submit">
          {editingService
            ? "Save Changes"
            : "Add Service"}
        </Button>

        {editingService && (

          <Button
            type="button"
            onClick={() => {

              resetForm();

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

export default ServiceForm;