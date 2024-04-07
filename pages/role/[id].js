import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getSingleRole } from '../../api/roleData';

export default function ViewRole() {
  const [roleDetails, setRoleDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRole(id).then(setRoleDetails);
  }, [id]);
  // console.warn('', roleDetails);

  return (
    <div className="view-role">
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#7367ca', color: '#efe464',
        }}
        >

          <Card.Img variant="top" src={roleDetails?.image} alt={roleDetails?.name} style={{ maxHeight: '350px' }} />
          <Card.Body>
            <Card.Title>{roleDetails?.name} </Card.Title>
            <p>Description: {roleDetails?.description}</p>
            <ListGroup>
              <ListGroupItem> Equipment: {roleDetails?.equipment?.name} </ListGroupItem>
              <ListGroupItem> Boss: {roleDetails?.boss} </ListGroupItem>
              <ListGroupItem> Organizations: {roleDetails?.organizations?.map((organization) => (
                <p key={organization.id}>{organization.name}
                </p>
              ))}
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
      <div>
        {/* <Card style={{
        </Card> */}
      </div>
    </div>
  );
}
