import React from 'react';
import { addCommas, removeNonNumeric } from '../../../lib/helper';

const TextInput = ({
  name,
  register,
  type = 'text',
  label = null,
  placeholder = '',
  validations = {},
  errors,
  options = [],
  readOnly = false,
  value = '',
  setValue = null,
  defaultValue = null,
  orientation = 'horizintal',
  onChange = null,
}) => {
  // console.log('xna', errors);
  const error = errors?.[name];

  const onAmountChange = (e: any) => {
    setValue(name, addCommas(removeNonNumeric(e.target.value)));
  };

  return (
    <div className='form-control w-full'>
      {label && (
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          name={name}
          readOnly={readOnly}
          className={`textarea textarea-bordered  ${error && 'input-error'}`}
          {...register(name, validations)}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          {...register(name, validations)}
          className='select select-bordered w-full'
        >
          <option value='' disabled selected>
            {label}
          </option>
          {options?.map((a) => {
            return (
              <option key={a?.value} value={a?.value}>
                {a?.label}
              </option>
            );
          })}
        </select>
      ) : type === 'amount' ? (
        <input
          readOnly={readOnly}
          className={`input input-bordered border-green-400 input-md w-full ${
            error && 'input-error'
          }`}
          type={'text'}
          name={name}
          onKeyUp={(e) => onAmountChange(e)}
          {...register(name, validations)}
        />
      ) : (
        <input
          readOnly={readOnly}
          className={`input input-bordered input-md w-full ${
            error && 'input-error'
          }`}
          type={type}
          name={name}
          {...register(name, validations)}
        />
      )}
      {error && (
        <label className='label'>
          <span className='label-text-alt text-error'>{error?.message}</span>
        </label>
      )}
    </div>
  );
};

export default TextInput;
