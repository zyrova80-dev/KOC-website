
import type { TeamMember } from "../../services/teamService";
import {
  Button,
  Card,
  EmptyState,
} from "../ui";
import { CardHeader } from "../ui/Card";

type TeamListProps = {
  members: TeamMember[];

  onDelete: (
    id: string
  ) => void;

  onEdit: (
    member: TeamMember
  ) => void;
};

function TeamList({
  members,
  onDelete,
  onEdit,
}: TeamListProps) {
  return (
    <Card>
      <CardHeader title="Current Team Members" />

      {members.length === 0 ? (
        <EmptyState title="No Team Members" description={""} />
      ) : (
        <div className="team-grid">
          {members.map((member) => (
            <div
              className="team-member-card"
              key={member.id}
            >
              <h3>{member.name}</h3>

              <p>
                {member.role}
              </p>

              <p>
                {member.bio}
              </p>

              <div className="team-actions">
                <Button
                  variant="secondary"
                  onClick={() => onEdit(member)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    member.id &&
                    onDelete(member.id)
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default TeamList;
