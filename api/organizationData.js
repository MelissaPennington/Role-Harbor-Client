import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations?orderBy="id"&equalTo="${id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrganizations,
  createOrganization,
  deleteOrganization,
  getSingleOrganization,
  updateOrganization,
};
