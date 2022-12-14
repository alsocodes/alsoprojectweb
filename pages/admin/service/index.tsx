import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AlsoTable from '../../../components/AlsoTable';
import AdminLayout from '../../../components/layout/Admin';
import apiCall from '../../../lib/apicall';
import {
  FaExpandAlt,
  FaPencilAlt,
  FaRegSave,
  FaSave,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import AlsoModal from '../../../components/AlsoModal';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/FormComponent/TextInput';
import {
  addCommas,
  formatCurrency,
  parsingFloat,
  removeNonNumeric,
} from '../../../lib/helper';
import moment from 'moment';

const Service = () => {
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
      key: 'client.name',
      label: 'Klien',
    },
    {
      key: 'status',
      label: 'Status',
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
                setFormData({
                  ...row,
                  formType: 'detail',
                });
                setShow(true);
              }}
            >
              <FaExpandAlt />
            </button>
            <button
              className='btn btn-sm btn-warning mb-1'
              onClick={() => {
                setFormData({
                  ...row,
                  amount: addCommas(row?.amount),
                  clientId: row?.client?.id,
                  formType: 'edit',
                });
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
    apiCall.get('/service').then((result) => {
      setData(result?.data);
    });
  };
  const [clients, setClients] = useState([]);
  const getClients = () => {
    apiCall.get('/client').then((result) => {
      setClients(result?.data?.rows);
    });
  };
  useEffect(() => {
    getData();
    getClients();
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
      description: '',
      periodTerm: '',
      date: '',
      amount: 0,
      status: '',
      clientId: '',
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
      console.log('xna', key, formData[key]);
      if (key === 'clientId') {
      }
      setValue(key, formData[key]);
    });
  }, [formData, clients]);

  const submitForm = (param) => {
    const data = {
      ...param,
      amount: parsingFloat(removeNonNumeric(param?.amount)),
    };
    if (data?.id) {
      apiCall.put(`/service/${data?.id}`, data).then(() => {
        getData();
        setShow(false);
      });
    } else {
      apiCall.post(`/service`, data).then(() => {
        getData();
        setShow(false);
      });
    }
  };

  const deleteData = (id: string) => {
    apiCall.delete(`/service/${id}`).then(() => {
      getData();
      setShow(false);
    });
  };

  return (
    <AdminLayout
      data={{
        title: 'AlsoProject | Dashboard Admin',
        page: 'service',
      }}
    >
      <div className='w-full h-full'>
        <div className='block md:flex justify-between mb-4 items-baseline'>
          <h2 className='text-2xl font-semibold'>Service</h2>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li>
                <Link href='/admin'>
                  <a>Beranda</a>
                </Link>
              </li>
              <li>
                <Link href='/admin/service'>
                  <a>Service</a>
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
              label: 'Tambah Service',
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
      <AlsoModal size={'lg'} show={show} setShow={setShow}>
        <h3 className='text-lg font-semibold mb-2'>
          {formData?.formType === 'edit'
            ? 'Edit'
            : formData?.formType === 'add'
            ? 'Tambah'
            : formData?.formType === 'delete'
            ? 'Hapus'
            : 'Detail'}{' '}
          Service
        </h3>
        {(formData?.formType === 'edit' || formData?.formType === 'add') && (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='my-1'>
              <TextInput
                label='Klien'
                name='clientId'
                register={register}
                type='select'
                options={clients?.map((a) => {
                  return {
                    value: a?.id,
                    label: a?.name,
                  };
                })}
                errors={errors}
                validations={{ required: 'Client harus disi' }}
              />
            </div>
            <div className='my-1'>
              <TextInput
                label='Nama'
                name='name'
                register={register}
                errors={errors}
                validations={{ required: 'Nama harus disi' }}
              />
            </div>
            <div className='my-1 w-full'>
              <TextInput
                label='Keterangan'
                type='textarea'
                name='description'
                errors={errors}
                register={register}
                validations={{ required: 'Keterangan harus disi' }}
              />
            </div>
            <div className='flex gap-4'>
              <div className='my-1 w-full'>
                <TextInput
                  label='Tanggal'
                  name='date'
                  type='date'
                  register={register}
                  errors={errors}
                  validations={{ required: 'Tanggal harus disi' }}
                />
              </div>
              <div className='my-1 w-full'>
                <TextInput
                  type='amount'
                  label='Nominal'
                  name='amount'
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  validations={{
                    required: 'Nominal harus disi',
                    min: { value: 1, message: 'Tidak boleh 0' },
                  }}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='my-1 w-full'>
                <TextInput
                  errors={errors}
                  label='Periode'
                  type='select'
                  name='periodTerm'
                  register={register}
                  validations={{ required: 'Periode harus disi' }}
                  options={[
                    { value: 'OneTime', label: 'OneTime' },
                    { value: 'Monthly', label: 'Monthly' },
                    { value: 'Quarterly', label: 'Quarterly' },
                    { value: 'SemiAnually', label: 'SemiAnually' },
                    { value: 'Anually', label: 'Anually' },
                    { value: 'Custom', label: 'Custom' },
                  ]}
                />
              </div>
              <div className='my-1 w-full'>
                <TextInput
                  errors={errors}
                  label='Status'
                  type='select'
                  name='status'
                  register={register}
                  validations={{ required: 'Status harus disi' }}
                  options={[
                    { value: 'ACTIVE', label: 'ACTIVE' },
                    { value: 'SUSPEND', label: 'SUSPEND' },
                    { value: 'INACTIVE', label: 'INACTIVE' },
                  ]}
                />
              </div>
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
                  <td className='w-28'>Client</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.client?.name}</td>
                </tr>
                <tr>
                  <td className='w-28'>Nama</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.name}</td>
                </tr>
                <tr>
                  <td className='w-28'>Keterangan</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.description}</td>
                </tr>
                <tr>
                  <td className='w-28'>Tanggal</td>
                  <td className='w-1'>:</td>
                  <td>{moment(formData?.date).format('DD MMMM YYYY')}</td>
                </tr>
                <tr>
                  <td className='w-28'>Periode</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.periodTerm}</td>
                </tr>
                <tr>
                  <td className='w-28'>Nominal</td>
                  <td className='w-1'>:</td>
                  <td>{formatCurrency(formData?.amount)}</td>
                </tr>
                <tr>
                  <td className='w-28'>Status</td>
                  <td className='w-1'>:</td>
                  <td>{formData?.status}</td>
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
                    setFormData({
                      ...formData,
                      formType: 'delete',
                    })
                  }
                >
                  <FaTrashAlt className='mr-2' />
                  Hapus
                </button>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={() =>
                    setFormData({
                      ...formData,
                      amount: addCommas(formData?.amount),
                      clientId: formData?.client?.id,
                      formType: 'edit',
                    })
                  }
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
              Apakah Anda yakin akan menghapus service {formData?.name}?
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

export default Service;
