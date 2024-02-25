import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRole, updateRole } from '../../api/roleData';
import DropDown from '../MultiSelectDD';
import getEquipment from '../../api/equipmentData';
import DropDownSelectedContext from '../../utils/context/dropDownSelectedContext';

const initialState = {
  name: '',
  description: '',
  boss: '',
  equipment: {},
  user: {},
};

function RoleForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [states, setEquipments] = useState([]);
  const [existingOrganizations, setExistingOrganizations] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput({ ...obj, equipment: obj.equipment.id });
  }, [obj, user]);

  useEffect(() => {
    getEquipment().then(setEquipments);
  }, []);

  useEffect(() => {
    const previousOrganizations = [];
    if (obj.id) {
      if (obj.id) {
        obj.organizations.forEach((organization) => {
          previousOrganizations.push(organization.id);
        });
        setExistingOrganizations(previousOrganizations);
      }
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateRole({ ...formInput, tourCategories: selectedOrganizations }).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, user: user.id, tourOrganizations: selectedOrganizations };
      createRole(payload).then(() => router.push('/'));
    }
  };

  return (
    <>
      <DropDownSelectedContext.Provider value={{ selectedOrganizations, setSelectedOrganizations }}>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Add a'} Role</h2>

          <FloatingLabel controlId="floatingInput1" label="Role Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="Equipment">
            <Form.Select
              aria-label="Equipment"
              name="equipment"
              onChange={handleChange}
              className="mb-3"
              value={formInput.equipment}
            >
              <option value="">Select applicable piece of equipment</option>
              {
            states.map((equipment) => (
              <option
                key={equipment.id}
                value={equipment.id}
              >
                {equipment.name}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Role Description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              value={formInput.description}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Role Boss" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Boss"
              name="boss"
              value={formInput.boss}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel id="organizations-dropdown">
            <DropDown role={obj} existingOrganizations={existingOrganizations} />
          </FloatingLabel>

          <Button variant="btn-small btn-secondary" type="submit">{obj.id ? 'Update' : 'Create'} Role</Button>

        </Form>
      </DropDownSelectedContext.Provider>
    </>
  );
}

RoleForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    boss: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    equipment: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

RoleForm.defaultProps = {
  obj: initialState,
};

export default RoleForm;
