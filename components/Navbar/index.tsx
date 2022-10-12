import React from 'react';

const Navbar = () => {
  return (
    <div className='containerx'>
      <div className='navbar block md:flex bg-base-100'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>daisyUI</a>
        </div>
        <div className='flex-none w-full block md:w-auto bg-gray-50 dropdown'>
          <label
            tabIndex={0}
            className='btn btn-ghost btn-circle float-right -mt-12'
          >
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
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
          <ul className='menu menu-vertical md:menu-horizontal h-0 p-0 block dropdown-content'>
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className='fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </a>
              <ul className='p-2 bg-base-100'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
