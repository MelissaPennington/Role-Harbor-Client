import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { deleteRole } from '../api/roleData';
import { useAuth } from '../utils/context/authContext';

function RoleCard({ roleObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisRole = () => {
    if (window.confirm(`Delete ${roleObj.name}?`)) {
      deleteRole(roleObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card id="role-card-style">
      <Card.Body id="role-card-description">
        <Card.Title>{roleObj.name} </Card.Title>
        <ListGroup>
          <ListGroupItem>
            <p> Description: {roleObj.description}</p>
          </ListGroupItem>
          <ListGroupItem>
            Equipment: {roleObj.equipment?.name}
          </ListGroupItem>
          <ListGroupItem>
            Boss: {roleObj.boss}
          </ListGroupItem>
          <ListGroupItem> Organizations: {roleObj?.organizations?.map((organization) => (
            <p key={organization.id}>{organization.name}</p>
          ))}
          </ListGroupItem>
        </ListGroup>
        {user && user.id && roleObj.user && roleObj.user.id && user.id === roleObj.user.id ? (
          <>
            <Link href={`/role/edit/${roleObj.id}`} passHref>
              <Button variant="light">EDIT</Button>
            </Link>
            <Link href={`/role/${roleObj.id}`} passHref>
              <Button variant="light" className="m-2">VIEW</Button>
            </Link>
            <Button variant="secondary" onClick={deleteThisRole} className="m-2 btn-block">
              DELETE
            </Button>
          </>
        ) : (
          <Link href={`/role/${roleObj.id}`} passHref>
            <Button variant="light" className="m-2">VIEW</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

RoleCard.propTypes = {
  roleObj: PropTypes.shape({
    name: PropTypes.string,
    boss: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    equipment: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    user: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RoleCard;
