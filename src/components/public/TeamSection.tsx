import { useEffect, useState } from "react";
import { getTeamMembers } from "../../services/teamService";
import type { TeamMember } from "../../services/teamService";
import "../../styles/teamSection.css";
import { Spinner } from "../ui";

function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getTeamMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to load team members", error);
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

if (loading) {
    return (
        <Spinner text="Loading team members..." />
    );
}

  return (
    <section  id="team" className="team-section">
      <div className="container">
        <h2>Meet Our Team</h2>

        <p className="team-subtitle">
          Meet the professionals behind our success.
        </p>

        <div className="team-grid">
          {members.map((member) => (
            <div
              className="team-card"
              key={member.id}
            >
              <img
                src={
                  member.imageUrl ||
                  "https://placehold.co/300x300?text=No+Image"
                }
                alt={member.name}
              />

              <h3>{member.name}</h3>

              <span>{member.role}</span>

              <p>{member.bio}</p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;