import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { getOrganizations } from '../api/organizationData';
import DropDownSelectedContext from '../utils/context/dropDownSelectedContext';

const MultiSelectDropdown = ({ options, selected, toggleOption }) => (
  <div className="c-multi-select-dropdown">
    <div className="c-multi-select-dropdown__selected">
      <div> Select Organizations</div>
    </div>
    <ul className="c-multi-select-dropdown__options">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <div key={option.name}>
            <FloatingLabel className="c-multi-select-dropdown__option" onClick={() => toggleOption({ id: option.id })}>
              <input type="checkbox" onChange={() => ''} checked={isSelected} className="c-multi-select-dropdown__option-checkbox" />
              <span>{option.name}</span>
            </FloatingLabel>
          </div>
        );
      })}
    </ul>
  </div>
);

const DropDown = ({ existingOrganizations }) => {
  const [selected, setSelected] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const { setSelectedOrganizations } = useContext(DropDownSelectedContext);

  useEffect(() => {
    setSelectedOrganizations(selected);
  }, [selected, setSelectedOrganizations]);

  useEffect(() => {
    if (existingOrganizations.length > 0) {
      setSelected(existingOrganizations);
    }
  }, [existingOrganizations]);

  const toggleOption = ({ id }) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
      }
      newArray.push(id);

      return newArray;
    });
  };

  useEffect(() => {
    getOrganizations().then(setOrganizations);
  }, []);

  return (
    <MultiSelectDropdown options={organizations} selected={selected} toggleOption={toggleOption} />
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ),
  toggleOption: PropTypes.func.isRequired,
};

MultiSelectDropdown.defaultProps = {
  selected: [],
};

DropDown.propTypes = {
  existingOrganizations: PropTypes.arrayOf(
    PropTypes.number,
  ),
};

DropDown.defaultProps = {
  existingOrganizations: [],
};

export default DropDown;
