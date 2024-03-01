import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setShowingRoles, roles }) => {
  const handleChange = (e) => {
    const filteredRoles = [];

    roles.forEach((role) => {
      if (role.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        filteredRoles.push(role);
      }

      if (role.organization && role.organization.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        if (!filteredRoles.find((element) => element.id === role.id)) {
          filteredRoles.push(role);
        }
      }

      role.organizations.forEach((organization) => {
        if (organization.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          if (!filteredRoles.find((element) => element.id === role.id)) {
            filteredRoles.push(role);
          }
        }
      });
    });

    setShowingRoles(filteredRoles);
  };

  return (
    <div>
      <input
        placeholder="Search Roles"
        onChange={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      boss: PropTypes.string,
      equipment: PropTypes.string,
      id: PropTypes.number,
      organizations: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  setShowingRoles: PropTypes.func.isRequired,
};

export default SearchBar;
