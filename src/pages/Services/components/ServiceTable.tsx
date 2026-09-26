
import Table from "../../../components/ui/Table";
import TableHead from "../../../components/ui/TableHead";
import TableBody from "../../../components/ui/TableBody";
import Button from "../../../components/ui/Button";

import type { Service } from "../type";

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}: ServiceTableProps) {
  return (
    <Table>
      <TableHead>
        <tr>
          <th>Title</th>
          <th>Short Description</th>
          <th>Order</th>
          <th>Featured</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </TableHead>

      <TableBody>
        {services.length === 0 ? (
          <tr>
            <td colSpan={6}>
              No services found.
            </td>
          </tr>
        ) : (
          services.map((service) => (
            <tr key={service.id}>
              <td>{service.title}</td>

              <td>{service.shortDescription}</td>

              <td>{service.displayOrder}</td>

              <td>
                {service.featured ? "Yes" : "No"}
              </td>

              <td>
                {service.active ? "Active" : "Inactive"}
              </td>

              <td>
                <Button
                  type="button"
                  onClick={() => onEdit(service)}
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  onClick={() => onDelete(service)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </TableBody>
    </Table>
  );
}
