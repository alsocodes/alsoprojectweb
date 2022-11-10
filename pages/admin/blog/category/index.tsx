import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AlsoTable from '../../../../components/AlsoTable';
import AdminLayout from '../../../../components/layout/Admin';
import apiCall from '../../../../lib/apicall';
import {
  FaExpandAlt,
  FaPencilAlt,
  FaRegSave,
  FaSave,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import AlsoModal from '../../../../components/AlsoModal';
import { useForm } from 'react-hook-form';
import TextInput from '../../../../components/FormComponent/TextInput';

const BlogCategory = () => {
  const colums = [
    {
      key: 'no',
      label: 'No',
      formatter: (val: any, row: any, index: number) => index + 1,
    },
    {
      key: 'name',
      label: 'Nama',
    },
    {
      key: 'count',
      label: 'Post',
    },
    {
      key: 'action',
      label: 'Action',
      formatter: (val: any, row: any, index: number) => {
        return (
          <div className='block md:flex gap-1'>
            <button
              className='btn btn-sm btn-info mb-1'
              onClick={() => {
                setFormData({ ...row, formType: 'detail' });
                setShow(true);
              }}
            >
              <FaExpandAlt />
            </button>
            <button
              className='btn btn-sm btn-warning mb-1'
              onClick={() => {
                setFormData({ ...row, formType: 'edit' });
                setShow(true);
              }}
            >
              <FaPencilAlt />
            </button>
            <button
              className='btn btn-sm btn-error mb-1'
              onClick={() => {
                setFormData({ ...row, formType: 'delete' });
                setShow(true);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState(null);
  const getData = () => {
    apiCall.get('/admin/blog/category').then((result) => {
      setData(result?.data);
    });
  };
  useEffect(() => {
    getData();
  }, [apiCall]);

  const [show, setShow] = useState(false);

  const [formData, setFormData]: any = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onAddButton = () => {
    setFormData({
      id: null,
      name: '',
      email: '',
      address: '',
      phone: '',
      picName: '',
      picPhone: '',
      formType: 'add',
    });
    setShow(true);
  };

  useEffect(() => {
    if (!show) setFormData(null);
  }, [show]);

  useEffect(() => {
    if (!formData) return;
    Object.keys(formData)?.forEach((key) => {
      setValue(key, formData[key]);
    });
  }, [formData]);

  const submitForm = (data) => {
    if (data?.id) {
      apiCall.put(`/admin/blog/category/${data?.id}`, data).then(() => {
        getData();
        setShow(false);
      });
    } else {
      apiCall.post(`/admin/blog/category`, data).then(() => {
        getData();
        setShow(false);
      });
    }
  };

  const deleteData = (id: string) => {
    apiCall.delete(`/admin/blog/category/${id}`).then(() => {
      getData();
      setShow(false);
    });
  };

  return (
    <AdminLayout
      data={{
        title: '',
        page: 'blogCategory',
      }}
    >
      <div className='w-full h-full'>
        <div className='block md:flex justify-between mb-4 items-baseline'>
          <h2 className='text-2xl font-semibold'>Kategori Blog</h2>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li>
                <Link href='/admin'>
                  <a>Beranda</a>
                </Link>
              </li>
              <li>
                <Link href='/admin/admin/blog/category'>
                  <a>Kategori Blog</a>
                </Link>
              </li>
              {/* <li>Add Document</li> */}
            </ul>
          </div>
        </div>
        <div>
          <AlsoTable
            columns={colums}
            data={data?.rows || []}
            isServer={true}
            search={(search) => console.log(search)}
            addAction={{
              label: 'Tambah Kategori',
              action: () => onAddButton(),
            }}
            pagination={{
              count: data?.count,
              page: data?.page,
              pageSize: data?.pageSize,
            }}
          />
        </div>
      </div>
      <AlsoModal size={'md'} show={show} setShow={setShow}>
        <h3 className='text-lg font-semibold mb-2'>
          {formData?.formType === 'edit'
            ? 'Edit'
            : formData?.formType === 'add'
            ? 'Tambah'
            : formData?.formType === 'delete'
            ? 'Hapus'
            : 'Detail'}{' '}
          Kategori
        </h3>
        {(formData?.formType === 'edit' || formData?.formType === 'add') && (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='my-1'>
              <TextInput
                label='Nama'
                name='name'
                register={register}
                errors={errors}
                validations={{ required: 'Nama harus disi' }}
              />
            </div>
            <div className='my-1'>
              <TextInput
                label='Slug'
                name='slug'
                register={register}
                errors={errors}
                validations={{ required: 'Nama harus disi' }}
              />
            </div>
            <div className='my-1'>
              <TextInput
                label='Parent'
                name='parentId'
                register={register}
                type='select'
                options={[]}
                errors={errors}
              />
            </div>
            <div className='flex justify-between mt-4 py-4 border-t border-gray-200'>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => setShow(false)}
              >
                <FaTimes className='mr-2' />
                Tutup
              </button>
              <button type='submit' className='btn btn-primary'>
                <FaRegSave className='mr-2' />
                Simpan
              </button>
            </div>
          </form>
        )}
        {formData?.formType === 'detail' && (
          <>
            <table className='table table-compact w-full'>
              <tbody>
                <tr>
                  <td className='w-28'>Nama</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.name}</td>
                </tr>
                <tr>
                  <td className='w-28'>Alamat</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.address}</td>
                </tr>
                <tr>
                  <td className='w-28'>Email</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.email}</td>
                </tr>
                <tr>
                  <td className='w-28'>No Telp</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.phone}</td>
                </tr>
                <tr>
                  <td className='w-28'>Nama PIC</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.picName}</td>
                </tr>
                <tr>
                  <td className='w-28'>No Telp PIC</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.picPhone}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-between mt-4 pt-2 border-t border-gray-200'>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => setShow(false)}
              >
                <FaTimes className='mr-2' />
                Tutup
              </button>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='btn btn-error'
                  onClick={() =>
                    setFormData({ ...formData, formType: 'delete' })
                  }
                >
                  <FaTrashAlt className='mr-2' />
                  Hapus
                </button>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={() => setFormData({ ...formData, formType: 'edit' })}
                >
                  <FaPencilAlt className='mr-2' />
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
        {formData?.formType === 'delete' && (
          <>
            <div className='py-4'>
              Apakah Anda yakin akan menghapus client {formData?.name}?
            </div>
            <div className='flex justify-between mt-4 pt-2 border-t border-gray-200'>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => setShow(false)}
              >
                <FaTimes className='mr-2' />
                Tutup
              </button>
              <button
                type='button'
                className='btn btn-error'
                onClick={() => deleteData(formData?.id)}
              >
                <FaTrashAlt className='mr-2' />
                Ya, Hapus
              </button>
            </div>
          </>
        )}
      </AlsoModal>
    </AdminLayout>
  );
};

export default BlogCategory;
