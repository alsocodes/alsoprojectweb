import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar2 = () => {
  const [bgFixed, setBgFixed] = useState('bg-transparent');

  const handleScroll = () => {
    if (window.scrollY > 30) setBgFixed('bg-white shadow-sm');
    else setBgFixed('');
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: any) => {
    e.preventDefault();
    const to = e.target.getAttribute('data-to');
    const div = document.getElementById(to);

    if (div) {
      setTimeout(() => {
        window.scrollTo({
          top: div.offsetTop - 60,
          behavior: 'smooth',
        });
      }, 100);

      setTimeout(() => {
        //@ts-ignore:next-line
        if (document.activeElement) document.activeElement.blur();
      }, 100);
    }
  };

  const checkAndCloseDropDown = () => {};
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-= ${bgFixed}`}
    >
      <div className='navbar justify-between px-4 md:px-10'>
        <div className='navbar-start'>
          <Link href={'/'}>
            <a>
              <div className='relative w-36 h-12 cursor-pointer'>
                <Image
                  src='/images/logo-1.png'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            </a>
          </Link>
          {/* <a className='btn btn-ghost normal-case text-xl'>daisyUI</a> */}
        </div>

        <div className='flex-none hidden md:block'>
          <ul className='menu menu-horizontal p-0'>
            <li>
              <Link href={'#about'} scroll={false}>
                <a data-to='about' onClick={handleNavClick}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href={'#service'} scroll={false}>
                <a data-to='service' onClick={handleNavClick}>
                  Service
                </a>
              </Link>
            </li>
            <li>
              <Link href={'#portofolio'} scroll={false}>
                <a data-to='portofolio' onClick={handleNavClick}>
                  Portofolio
                </a>
              </Link>
            </li>
            <li>
              <Link href={'#testimoni'} scroll={false}>
                <a data-to='testimoni' onClick={handleNavClick}>
                  Testimoni
                </a>
              </Link>
            </li>
            {/* <li>
              <Link href={'#price'} scroll={false}>
                <a data-to='price' onClick={handleNavClick}>
                  Price
                </a>
              </Link>
            </li>
            <li>
              <Link href={'#latest-blog'} scroll={false}>
                <a data-to='latest-blog' onClick={handleNavClick}>
                  Latest Blog
                </a>
              </Link>
            </li> */}
            <li>
              <Link href={'#contact'} scroll={false}>
                <a data-to='contact' onClick={handleNavClick}>
                  Contact
                </a>
              </Link>
            </li>
            {/* <li tabIndex={0}>
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
            </li> */}
            {/* <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <div className='navbar-end md:hidden'>
          <div className='dropdown'>
            <label
              tabIndex={0}
              className='btn btn-ghost btn-circle'
              // onMouseDown={checkAndCloseDropDown}
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
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content p-2 shadow bg-base-100 right-0 rounded-box mt-3 w-60'
            >
              <li>
                <Link href={'#about'} scroll={false}>
                  <a data-to='about' onClick={handleNavClick}>
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'#service'} scroll={false}>
                  <a data-to='service' onClick={handleNavClick}>
                    Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'#portofolio'} scroll={false}>
                  <a data-to='portofolio' onClick={handleNavClick}>
                    Portofolio
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'#testimoni'} scroll={false}>
                  <a data-to='testimoni' onClick={handleNavClick}>
                    Testimoni
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href={'#price'} scroll={false}>
                  <a data-to='price' onClick={handleNavClick}>
                    Price
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'#latest-blog'} scroll={false}>
                  <a data-to='latest-blog' onClick={handleNavClick}>
                    Latest Blog
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href={'#contact'} scroll={false}>
                  <a data-to='contact' onClick={handleNavClick}>
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
