import type { TeamMember } from "../../services/teamService";
import { Button, Card, EmptyState } from "../ui";

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
    <Card title="Current Team Members">

       {members.length === 0 ? (
            <><EmptyState
           title="No Team Members"
           message="Add your first team member to get started." /></>
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
                variant="outline"
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