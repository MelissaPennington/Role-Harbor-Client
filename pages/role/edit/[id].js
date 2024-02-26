import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRole } from '../../../api/roleData';
import RoleForm from '../../../components/forms/RoleForm';

export default function EditRole() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleRole(id).then(setEditItem);
  }, [id]);

  return (<RoleForm obj={editItem} setEditObj={setEditItem} />);
}
