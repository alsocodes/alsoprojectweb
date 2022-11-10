import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AdminSidebar = ({ page }) => {
  return (
    <div className='bg-base-200 w-80 h-full'>
      {/* <div className='bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex shadow-sm'>
        <a
          href='/'
          aria-current='page'
          aria-label='Homepage'
          className='flex-0 btn btn-ghost px-2'
        >
          <div className='font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl'>
            <div className='relative w-36 h-12 cursor-pointer'>
              <Image src='/images/logo-1.png' layout='fill' objectFit='cover' />
            </div>
          </div>
        </a>
      </div> */}
      <ul className='menu w-full p-4 rounded-box'>
        <li>
          <Link href='/admin'>
            <a className={page === 'dashboard' ? 'active' : ''}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Dashboard
            </a>
          </Link>
        </li>
        {/* <li className='menu-title'>
          <span>Transaction</span>
        </li>
        <li>
          <Link href='/admin/service'>
            <a className={page === 'service' ? 'active' : ''}>Service</a>
          </Link>
        </li>
        <li>
          <Link href='/admin/invoice'>
            <a className={page === 'invoice' ? 'active' : ''}>Invoice</a>
          </Link>
        </li>
        <li className='menu-title'>
          <span>Master</span>
        </li>
        <li>
          <Link href='/admin/client'>
            <a className={page === 'client' ? 'active' : ''}>Client</a>
          </Link>
        </li>
        <li>
          <Link href='/admin/user'>
            <a className={page === 'user' ? 'active' : ''}>User</a>
          </Link>
        </li> */}
        <li className='menu-title'>
          <span>Blog</span>
        </li>
        <li>
          <Link href='/admin/blog/category'>
            <a className={page === 'blogCategory' ? 'active' : ''}>Category</a>
          </Link>
        </li>
        <li>
          <Link href='/admin/blog/post'>
            <a className={page === 'blogPost' ? 'active' : ''}>Post</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
