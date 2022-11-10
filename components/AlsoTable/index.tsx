import React from 'react';
import styles from './AlsoTable.module.css';

const AlsoTable = ({
  columns,
  data,
  pagination,
  isServer,
  search,
  addAction,
}) => {
  const page = pagination?.page || 1;
  const pageSize = pagination?.pageZie || 20;
  const count = pagination?.count || data?.length;
  const showing = (page - 1) * pageSize + 1 || 1;
  const showingTo = showing + pageSize > count ? count : showing + pageSize;
  const pageCount = Math.ceil(count / pageSize);
  const pageList = Array.from(Array(pageCount).keys());

  return (
    <div>
      <div className='flex w-full justify-between mb-4 p-1 align-middle'>
        {search && (
          <input
            type='text'
            placeholder='Pencarian'
            className='input input-bordered w-full max-w-xs'
          />
        )}
        {addAction && (
          <button
            onClick={() => addAction?.action('aaa')}
            className='btn btn-primary btn-md'
          >
            {addAction?.label}
          </button>
        )}
      </div>
      <div className='overflow-x-auto'>
        <table className={`table table-zebra w-full`}>
          <thead>
            <tr>
              {columns?.map((a: any) => {
                return (
                  <th className='py-2 px-2 md:p-4' key={a?.key}>
                    {a?.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any, index: number) => {
              return (
                <tr key={`row-${index}`}>
                  {columns?.map((col: any, i: number) => {
                    let val = row[col?.key];
                    if (col?.key.includes('.')) {
                      const [k1, k2] = col?.key.split('.');
                      val = row[k1]?.[k2];
                    }
                    if (typeof col?.formatter === 'function') {
                      return (
                        <td
                          className={`py-2 px-2 md:p-4 ${styles.alsotable_td} ${col?.className}`}
                          key={i}
                        >
                          {col?.formatter(val, row, index)}
                        </td>
                      );
                    }
                    return (
                      <td
                        className={`py-2 px-2 md:p-4 ${styles.alsotable_td} ${col?.className}`}
                        key={i}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between my-4 items-center'>
        <div className='text-sm text-gray-600'>
          Menampikan {showing} s.d. {showingTo} dari {pagination?.count} data
        </div>
        <div className='btn-group'>
          {pageList?.map((p) => {
            return (
              <button key={p} className='btn'>
                {p + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlsoTable;
