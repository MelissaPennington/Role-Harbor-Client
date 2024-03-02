import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRoles } from '../api/roleData';
import RoleCard from '../components/RoleCard';
import SearchBar from '../components/searchBar';

function Home() {
  const [roles, setRoles] = useState([]);
  const [showingRoles, setShowingRoles] = useState([]);

  const getAllRoles = () => {
    getRoles().then(setRoles);
  };

  useEffect(() => {
    setShowingRoles(roles);
  }, [roles]);

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className="my-4">
      <center>
        <Card id="intro-card">
          <Card.Body>
            <p>Step right up, ladies and gentlemen, and behold the marvel that is the Role Harbor Carnival Extravaganza! 🎪🎉 In the grand spectacle of our organization, where new hires and seasoned team members embark on the thrilling journey of collaboration, we have noticed a gap – a gap in the vibrant tapestry of understanding roles and responsibilities. Fear not, for the Role Harbor is here to whisk you away on a whimsical adventure!</p>
            <Link href="/role/new" passHref>
              <Button variant="btn-small btn-secondary">Add A Role</Button>
            </Link>
          </Card.Body>
          <SearchBar setShowingRoles={setShowingRoles} showingRoles={showingRoles} roles={roles} />
        </Card>
      </center>
      <div className="d-flex flex-sm-wrap" id="role-card-index">
        {showingRoles.map((role) => (
          <RoleCard key={role.id} roleObj={role} onUpdate={getAllRoles} />
        ))}
      </div>
    </div>

  );
}

export default Home;
