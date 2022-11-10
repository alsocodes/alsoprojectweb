import React from 'react';

const AlsoModal = ({ show, size = 'md', children, setShow }) => {
  const classSize =
    size === 'full'
      ? 'w-11/12 max-w-[90%] md:max-w-5xl'
      : size === 'lg'
      ? 'w-11/12 max-w-[90%] md:w-8/12 md:max-w-7xl'
      : size === 'md'
      ? 'w-6/12 max-w-md'
      : 'w-6/12 max-w-md';

  const onClickModalOutside = (e: any) => {
    console.log(e.target.classList);
    if (e.target.classList.contains('modal-outside')) setShow(false);
  };
  return (
    <div>
      <input
        type='checkbox'
        id='my-modal'
        className='modal-toggle'
        checked={show}
        onChange={() => console.log('change')}
      />
      <div
        className='modal z-50 modal-outside'
        onClick={(e) => onClickModalOutside(e)}
      >
        <div className={`modal-box ${classSize} p-4 md:p-6`}>
          {children}
          {/* <div className='modal-action'>
            <button className='btn bnt-primary' onClick={() => setShow(false)}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AlsoModal;
