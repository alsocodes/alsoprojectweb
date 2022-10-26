import React from 'react';
import AdminLayout from '../../components/layout/Admin';

const Dashboard = () => {
  return (
    <AdminLayout
      data={{
        title: 'AlsoProject | Dashboard Admin',
      }}
    >
      <p className='min-h-screen'>test</p>
    </AdminLayout>
  );
};

export default Dashboard;
