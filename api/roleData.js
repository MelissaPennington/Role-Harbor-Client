import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRoles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getRoleById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/?userId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteRole = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleRole = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles`, {
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

const updateRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getRoles,
  getRoleById,
  createRole,
  deleteRole,
  getSingleRole,
  updateRole,
};
