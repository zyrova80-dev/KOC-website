
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Sidebar from "../../components/sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import SearchBar from "../../components/ui/SearchBar";

import ServiceForm from "./components/ServiceForm";
import ServiceTable from "./components/ServiceTable";

import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "./services/serviceService";

import type { Service } from "./type";

import { auth } from "../../firebase";


export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);

  const [editingService, setEditingService] =
    useState<Service | null>(null);

  const [search, setSearch] = useState("");

  const [serviceToDelete, setServiceToDelete] =
    useState<Service | null>(null);

  // Fetch services
  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services
  const filteredServices = services.filter((service) =>
    service.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Add service
  const handleAdd = async (
    service: Omit<Service, "id" | "createdAt">
  ) => {
    try {
      await addService(service);
      await fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // Update service
  const handleUpdate = async (
    id: string,
    service: Partial<Service>
  ) => {
    try {
      await updateService(id, service);
      await fetchServices();
      setEditingService(null);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Edit service
  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  // Ask for delete confirmation
  const handleDeleteRequest = (service: Service) => {
    setServiceToDelete(service);
  };

  // Delete service
  const handleDelete = async () => {
    if (!serviceToDelete?.id) {
      return;
    }

    try {
      await deleteService(serviceToDelete.id);
      await fetchServices();
      setServiceToDelete(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <>
      <Sidebar onLogout={handleLogout} />

      <div className="search-bar">
        <SearchBar
          placeholder="Search Services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ServiceForm
        onAdd={handleAdd}
        editingService={editingService}
        onUpdate={handleUpdate}
        cancelEdit={() => setEditingService(null)}
      />

      <ServiceTable
        services={filteredServices}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <ConfirmModal
        isOpen={serviceToDelete !== null}
        title="Delete Service"
        message={
          serviceToDelete
            ? `Are you sure you want to delete "${serviceToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setServiceToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
