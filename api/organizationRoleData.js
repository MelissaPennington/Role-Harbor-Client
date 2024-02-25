import axios from 'axios';
import { clientCredentials } from '../utils/client';

const databaseUrl = clientCredentials.databaseURL;

const addOrganizationToRole = async (roleId, organizationId) => {
  try {
    const { data } = await axios.post(`${databaseUrl}/roles/${roleId}/add_organization_role/${organizationId}`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'addOrganization failed';
  }
};
const removeOrganizationFromRole = async (roleId, organizationId) => {
  try {
    const { data } = await axios.put(`${databaseUrl}/roles/${roleId}/remove_organization_role?organizationId=${organizationId}`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'addOrganization failed';
  }
};

export { addOrganizationToRole, removeOrganizationFromRole };
