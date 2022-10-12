import Image from 'next/image';
import React from 'react';
import styles from './Hero.module.css';
const Hero = () => {
  return (
    <div
      className={`hero ${styles.myhero} min-h-screen bg-white overflow-hidden`}
      // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
    >
      <div className='hero-content px-0 text-primary-content relative z-10 w-full'>
        <div className='container  px-5 md:px-0 mx-auto'>
          <div className='block md:flex w-full align-middle'>
            <div
              data-aos='fade-right'
              data-aos-offset='300'
              data-aos-easing='ease-in-sine'
              data-aos-once='true'
              className='py-4 sm:py-10 md:pr-4 md:py-2 w-full md:w-2/4 md:self-center'
            >
              <small className='text-lg md:text-2xl'>start with</small>
              <h1 className='mb-2 md:mb-5 text-3xl md:text-5xl font-bold'>
                ALSOPROJECT
              </h1>
              <p className='mb-5 text-sm md:text-base'>
                Solusi untuk pembuatan aplikasi, website, mobile app, toko
                online/e-commerce dan company profile mu.
              </p>
              {/* <button className='btn btn-primary'>Get Started</button> */}
            </div>
            <div
              data-aos='fade-left'
              data-aos-duration='500'
              data-aos-once='true'
              className='w-full md:w-2/4'
            >
              <div className='relative rounded-lg shadow-xl max-w-2xl h-96 max-h-72 md:h-100 md:max-h-full'>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src='/images/main-hero.jpg'
                  className='rounded-lg'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative w-full h-full overflow-hidden z-0'>
        <div className='absolute w-full h-auto bottom-0 sm:-bottom-10 left-0 right-0'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
            <path
              fill='#00cba9'
              fill-opacity='1'
              d='M0,192L34.3,202.7C68.6,213,137,235,206,208C274.3,181,343,107,411,90.7C480,75,549,117,617,133.3C685.7,149,754,139,823,117.3C891.4,96,960,64,1029,64C1097.1,64,1166,96,1234,96C1302.9,96,1371,64,1406,48L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z'
              data-darkreader-inline-fill=''
              // style={{darkr:"#007acc";}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
