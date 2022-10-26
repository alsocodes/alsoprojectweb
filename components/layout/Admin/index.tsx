import Head from 'next/head';
import React from 'react';
import AdminNavbar from '../../AdminNavbar';
import AdminSidebar from '../../AdminSidebar';
import Hero from '../../Hero';

const AdminLayout = ({ data, children }) => {
  return (
    <div data-theme='emerald'>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{data?.title} </title>
        <link
          rel='shortcut icon'
          href='assets/images/favicon.png'
          type='image/x-icon'
        />
      </Head>
      <main>
        <div className='bg-base-100 drawer drawer-mobile'>
          <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col items-center justify-center'>
            {/* <!-- Page content here --> */}

            <AdminNavbar />
            <div className='w-full p-6 mt-20'>{children}</div>
          </div>
          <div className='drawer-side'>
            <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
            <AdminSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
