import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../AdminNavbar';
import AdminSidebar from '../../AdminSidebar';
import AlsoModal from '../../AlsoModal';
import Hero from '../../Hero';

const AdminLayout = ({ data, children }) => {
  const [toggle, setToggle] = useState(false);
  const onDraweClick = (e) => {
    console.log();
    if (e.target.classList.contains('drawer-overlay')) setToggle(false);
  };

  const [classToggle, setClassToggle] = useState('z-0');
  useEffect(() => {
    if (toggle) setClassToggle('z-10');
    else {
      const to = setTimeout(() => {
        setClassToggle('z-0');
      }, 500);
      return () => clearTimeout(to);
    }
  }, [toggle]);

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
          <input
            id='my-drawer-2'
            type='checkbox'
            className='drawer-toggle'
            checked={toggle}
            readOnly
          />
          <div
            className={`drawer-side ${classToggle}`}
            onClick={(e) => onDraweClick(e)}
          >
            <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
            <AdminSidebar page={data?.page} />
          </div>
          <div className='drawer-content flex flex-col items-center justify-center'>
            <AdminNavbar setToggle={setToggle} />
            <div className='w-full h-full p-6'>{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
