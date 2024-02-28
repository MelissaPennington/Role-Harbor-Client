import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getRoleById } from '../api/roleData';
import RoleCard from '../components/RoleCard';

function UserRoles() {
  const [roles, setRoles] = useState([]);

  const { user } = useAuth();

  const getAllRoles = () => {
    getRoleById(user.id).then(setRoles);
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className="text-center my-4">
      <div id="user-roles-cards" className="d-flex flex-wrap">
        {roles.map((role) => (
          <RoleCard key={role.id} roleObj={role} onUpdate={getAllRoles} />
        ))}
      </div>

    </div>
  );
}

export default UserRoles;
