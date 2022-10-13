import React, { useState } from 'react';
import styles from './Portofolio.module.css';

const Portofolio = () => {
  const [modalData, setModalData]: any = useState(false);
  const portofolios = [
    {
      title: 'AmberKopi',
      description: 'Android App & Web Dashboard',
      image: '/images/portofolio/amber-sm.jpg',
      imageFull: '/images/portofolio/amber.jpg',
    },
    {
      title: 'SMPN33 Surabaya',
      description: 'Web Profil Sekolah & SIAKAD',
      image: '/images/portofolio/smp33-sm.jpg',
      imageFull: '/images/portofolio/smp33.jpg',
    },
    {
      title: 'SMAN1 Sumberrejo',
      description: 'Web Profil Sekolah',
      image: '/images/portofolio/sman1sbj-sm.jpg',
      imageFull: '/images/portofolio/sman1sbj.jpg',
    },
    {
      title: 'E-Retribusi Pasar',
      description: 'Disperindag Kab. Sidoarjo',
      image: '/images/portofolio/e-pasar-sm.png',
      imageFull: '/images/portofolio/e-pasar.png',
    },
    {
      title: 'Managemen Surat Dinsos Jatim',
      description: 'Dinsos Prov Jawa Timur',
      image: '/images/portofolio/dinsos-sm.png',
      imageFull: '/images/portofolio/dinsos.png',
    },
    {
      title: 'Moedah Ecommerce App',
      description: 'Moedah Ecommerce App',
      image: '/images/portofolio/moedah-app-sm.png',
      imageFull: '/images/portofolio/moedah-app.png',
    },
    {
      title: 'Tab Hotel Surabaya',
      description: 'Tab Hotel Surabaya',
      image: '/images/portofolio/tabhotel-sm.png',
      imageFull: '/images/portofolio/tabhotel.png',
    },
    {
      title: 'Parkirin (Parking Booking App)',
      description: 'Parkirin (Parking Booking App)',
      image: '/images/portofolio/parkirin-sm.png',
      imageFull: '/images/portofolio/parkirin.png',
    },
  ];
  return (
    <section
      id='portofolio'
      className={`py-10 md:py-20 text-base-content overflow-hidden ${styles.mybg}`}
    >
      <div className='container  px-5 md:px-0 mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto max-w-[620px] text-center'>
              <span className='mb-2 block text-lg font-semibold text-primary'>
                Portofolio
              </span>
              <h2 className='mb-2 text-xl font-bold text-dark sm:text-3xl'>
                Project yang telah kami selesaikan
              </h2>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap -m-1 md:-m-2'>
          {portofolios?.map((a) => {
            return (
              <div className='flex flex-wrap w-1/2 sm:w-1/3' key={a?.title}>
                <div
                  className='w-full p-2 md:p-4'
                  data-aos='zoom-out'
                  data-aos-once='true'
                  data-aos-delay='200'
                >
                  <div
                    onClick={() => setModalData(a)}
                    className='relative w-full h-full group cursor-pointer overflow-hidden rounded-lg'
                  >
                    <img
                      alt={a?.title}
                      className='block object-cover object-center w-full h-full group-hover:scale-125 transition-all duration-500'
                      src={a?.image}
                    />
                    <h4
                      className='absolute bg-black bg-opacity-70 
                      left-0 right-0 bottom-0 text-base-100 text-center p-2 rounded-b-lg
                      transition-all duration-500 opacity-0 group-hover:opacity-100'
                    >
                      {a?.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <input
        type='checkbox'
        id='my-modal-4'
        className='modal-toggle'
        checked={!!modalData}
      />
      <div
        id='modal'
        className='modal cursor-pointer'
        onClick={(e) => {
          // console.log();

          //@ts-ignore:next-line
          if (e.target?.classList?.contains('modal')) setModalData(false);
        }}
      >
        <div className='modal-box w-10/12 max-w-5xl relative'>
          <label
            onClick={() => setModalData(false)}
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>{modalData?.title}</h3>
          <div>
            <img
              src={modalData?.imageFull}
              alt={modalData?.title}
              className='block object-cover object-center w-full h-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portofolio;
