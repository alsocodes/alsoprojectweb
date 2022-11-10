import Link from 'next/link';
import React, { createRef, useEffect, useRef, useState } from 'react';
import AlsoTable from '../../../components/AlsoTable';
import AdminLayout from '../../../components/layout/Admin';
import apiCall from '../../../lib/apicall';
import {
  FaDownload,
  FaExpandAlt,
  FaFileDownload,
  FaPencilAlt,
  FaPlus,
  FaRegSave,
  FaSave,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import AlsoModal from '../../../components/AlsoModal';
import { useFieldArray, useForm } from 'react-hook-form';
import TextInput from '../../../components/FormComponent/TextInput';
import {
  addCommas,
  formatCurrency,
  parsingFloat,
  removeNonNumeric,
} from '../../../lib/helper';
import moment from 'moment';
import Image from 'next/image';
import Pdf from 'react-to-pdf';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Invoice = () => {
  const colums = [
    {
      key: 'no',
      label: '#',
      formatter: (val: any, row: any, index: number) => index + 1,
    },
    {
      key: 'no',
      label: 'No',
      formatter: (val: any, row: any, index: number) => `#${val}`,
    },
    {
      key: 'billTo',
      label: 'Bill To',
    },
    {
      key: 'grandTotal',
      label: 'Total',
      formatter: (val: any, row: any, index: number) => formatCurrency(val),
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
                setFormData({ ...row, formType: 'detail' });
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
                  formType: 'edit',
                });
                append(row?.items);
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
    apiCall.get('/invoice').then((result) => {
      setData(result?.data);
    });
  };
  const [clients, setClients] = useState([]);
  const getClients = () => {
    apiCall.get('/client').then((result) => {
      setClients(result?.data?.rows);
    });
  };
  const [services, setServices] = useState([]);
  const getServices = () => {
    apiCall.get('/service').then((result) => {
      setServices(result?.data?.rows);
    });
  };
  useEffect(() => {
    getData();
    getClients();
    getServices();
  }, [apiCall]);

  const [show, setShow] = useState(false);

  const [formData, setFormData]: any = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();
  const onAddButton = () => {
    setFormData({
      no: '',
      id: null,
      date: '',
      dueDate: '',
      amount: 0,
      clientId: '',
      formType: 'add',
    });
    remove(cFields);
    append({
      serviceId: '',
      amount: 0,
      qty: 1,
      description: '',
      periodTerm: '',
      periodStart: '',
      periodEnd: '',
    });
    setShow(true);
  };

  const watchItems = watch('items');
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'items', // unique name for your Field Array
    }
  );
  const cFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchItems[index],
    };
  });

  const prevFields = usePrevious(cFields) || null;
  useEffect(() => {
    cFields?.forEach((c: any, index: number) => {
      const prev = prevFields?.find((p) => p?.id === c?.id);
      const service = services?.find((a) => a?.id === c?.serviceId);
      if (c?.serviceId !== '' && (!prev || prev?.serviceId !== c?.serviceId)) {
        setValue(`items.${index}.amount`, addCommas(service?.amount));
        setValue(
          `items.${index}.description`,
          `${service?.name}\r\n${service?.description}`
        );
        setValue(`items.${index}.periodTerm`, service?.periodTerm);
      }

      if (prev?.periodTerm !== c?.periodTerm) {
        const addValue =
          c?.periodTerm === 'OneTime'
            ? 0
            : c?.periodTerm === 'Monthly'
            ? 1
            : c?.periodTerm === 'Quarterly'
            ? 3
            : c?.periodTerm === 'SemiAnually'
            ? 6
            : 12;
        const periodStart = moment(service?.activeTill, 'YYYY-MM-DD')
          .add(1, 'days')
          .format('YYYY-MM-DD');
        const periodEnd = moment(periodStart)
          .add(addValue, 'months')
          .format('YYYY-MM-DD');
        // console.log('xna pe', addValue, c?.periodTerm, periodEnd);

        setValue(`items.${index}.periodStart`, periodStart);
        setValue(`items.${index}.periodEnd`, periodEnd);
      }
    });
    // console.log('xna cf', cFields);
  }, [cFields]);

  const watchClient = watch('clientId');
  useEffect(() => {
    const client = clients?.find((a) => a?.id === watchClient);
    setValue('billTo', client?.name || '');
    setValue('billToPic', client?.picName || '');
    setValue('billToAddress', client?.address || '');
  }, [watchClient]);

  useEffect(() => {
    if (!show) setFormData(null);
  }, [show]);

  useEffect(() => {
    if (!formData) return;
    Object.keys(formData)?.forEach((key) => {
      if (key === 'clientId') {
      }
      setValue(key, formData[key]);
    });
  }, [formData, clients]);

  const submitForm = (param) => {
    const data = {
      ...param,
      items: param?.items.map((a) => {
        return {
          ...a,
          amount: parsingFloat(removeNonNumeric(a?.amount)),
        };
      }),
    };
    // console.log('xna', data);
    // return;
    if (data?.id) {
      apiCall.put(`/invoice/${data?.id}`, data).then(() => {
        getData();
        setShow(false);
      });
    } else {
      apiCall.post(`/invoice`, data).then(() => {
        getData();
        setShow(false);
      });
    }
  };

  const deleteData = (id: string) => {
    apiCall.delete(`/invoice/${id}`).then(() => {
      getData();
      setShow(false);
    });
  };

  const pdfRef = createRef();

  return (
    <AdminLayout
      data={{
        title: 'AlsoProject | Dashboard Admin',
        page: 'invoice',
      }}
    >
      <div className='w-full h-full'>
        <div className='block md:flex justify-between mb-4 items-baseline'>
          <h2 className='text-2xl font-semibold'>Invoice</h2>
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
              label: 'Tambah Invoice',
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
        <div className='flex items-start justify-between mb-4'>
          <h3 className='text-lg font-semibold mb-2'>
            {formData?.formType === 'edit'
              ? 'Edit'
              : formData?.formType === 'add'
              ? 'Tambah'
              : formData?.formType === 'delete'
              ? 'Hapus'
              : 'Detail'}{' '}
            Invoice
          </h3>
          <Pdf
            targetRef={pdfRef}
            filename={`invoice-${formData?.no}-${formData?.billTo}-${formData?.status}.pdf`}
            options={{
              orientation: 'portrait',
              unit: 'cm',
            }}
          >
            {({ toPdf }) => (
              <button onClick={toPdf} className='btn btn-primary btn-sm'>
                <FaFileDownload />
              </button>
            )}
          </Pdf>
          {formData?.type === 'add' || formData?.type === 'edit' ? (
            <div className='flex items-center gap-2'>
              <div className='text-xs'>Total :</div>
              <div className='font-semibold'>
                {formatCurrency(
                  cFields?.reduce(
                    (a: number, b: any) =>
                      a + parsingFloat(removeNonNumeric(b?.amount)) * b?.qty,
                    0
                  )
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {(formData?.formType === 'edit' || formData?.formType === 'add') && (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='flex gap-4'>
              <div className='my-1 w-full'>
                <TextInput
                  label='Nomor'
                  name='no'
                  type='text'
                  readOnly={true}
                  register={register}
                  errors={errors}
                />
              </div>
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
                  label='Jatuh Tempo'
                  name='dueDate'
                  type='date'
                  register={register}
                  errors={errors}
                  validations={{ required: 'Tanggal Jatuh Tempo harus disi' }}
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='my-1 w-full'>
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
              <div className='my-1 w-full'>
                <TextInput
                  label='Tagihan Kepada'
                  name='billTo'
                  type='text'
                  register={register}
                  errors={errors}
                  validations={{ required: 'Tagihan Kepada harus disi' }}
                />
              </div>
              <div className='my-1 w-full'>
                <TextInput
                  label='PIC Tagihan'
                  name='billToPic'
                  type='text'
                  register={register}
                  errors={errors}
                  validations={{ required: 'Tanggal Jatuh Tempo harus disi' }}
                />
              </div>
            </div>
            <div className='my-1 w-full'>
              <TextInput
                label='Alamat Tagihan'
                type='textarea'
                name='billToAddress'
                errors={errors}
                register={register}
                validations={{ required: 'Alamat Tagihan harus disi' }}
              />
            </div>

            <div className='mt-4 flex items-center justify-between py-1 border-b border-gray-400'>
              <label>Items</label>
              <div>
                <button
                  type='button'
                  className='btn btn-ghost btn-sm'
                  onClick={() => {
                    setValue('items', [
                      ...watchItems,
                      {
                        serviceId: '',
                        amount: 0,
                        qty: 1,
                        description: '',
                      },
                    ]);
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {cFields?.map((item: any, index: number) => {
              const amount = services?.find(
                (a) => a.id === item.serviceId
              )?.amount;
              return (
                <div
                  key={`index-${index}`}
                  className='my-2 p-4 border rounded-lg relative'
                >
                  <button
                    disabled={watchItems?.length === 1}
                    type='button'
                    className='btn btn-sm btn-ghost absolute right-0 top-0'
                    onClick={() =>
                      setValue(
                        'items',
                        watchItems.filter(
                          (a: any, i: number) => i !== index,
                          []
                        )
                      )
                    }
                  >
                    <FaTrashAlt />
                  </button>
                  {/* <input {...register(`items.${index}.qty` as const)} /> */}
                  <div className='flex gap-4'>
                    <div className='my-1 w-full'>
                      <TextInput
                        label='Service'
                        name={`items.${index}.serviceId`}
                        register={register}
                        type='select'
                        options={services?.map((a) => {
                          return {
                            value: a?.id,
                            label: a?.name,
                          };
                        })}
                        errors={errors}
                        validations={{ required: 'Service harus disi' }}
                      />
                    </div>
                    <div className='my-1 w-full'>
                      <TextInput
                        label='Nominal'
                        name={`items.${index}.amount`}
                        type='amount'
                        setValue={setValue}
                        register={register}
                        value={amount}
                        errors={errors}
                        validations={{ required: 'Nominal Service harus disi' }}
                      />
                    </div>
                    <div className='my-1 w-full'>
                      <TextInput
                        label='Jumlah'
                        name={`items.${index}.qty`}
                        type='number'
                        register={register}
                        errors={errors}
                        validations={{
                          required: 'Jumlah Service harus disi',
                          min: { value: 1, message: 'Minimal jumlah 1' },
                        }}
                      />
                    </div>
                  </div>
                  <div className='my-1 w-full'>
                    <TextInput
                      label='Keterangan'
                      type='textarea'
                      name={`items.${index}.description`}
                      errors={errors}
                      register={register}
                      validations={{ required: 'Keterangan harus disi' }}
                    />
                  </div>
                  <div className='flex gap-4'>
                    <div className='my-1 w-full'>
                      <TextInput
                        errors={errors}
                        label='Periode'
                        type='select'
                        name={`items.${index}.periodTerm`}
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
                        label='Tanggal Mulai'
                        name={`items.${index}.periodStart`}
                        type='date'
                        register={register}
                        errors={errors}
                        validations={{ required: 'Tanggal mulai harus disi' }}
                      />
                    </div>
                    <div className='my-1 w-full'>
                      <TextInput
                        label='Tanggal Selesai'
                        name={`items.${index}.periodEnd`}
                        type='date'
                        register={register}
                        errors={errors}
                        validations={{
                          required: 'Tanggal selesai harus disi',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
          <div>
            <div className='w-[21cm] h-[29cm] mx-auto overflow-hidden border border-gray-300'>
              <div
                ref={pdfRef}
                className='relative w-[21cm] h-[29cm] mx-auto p-6'
              >
                <div className='w-full h-full'>
                  <div
                    className={`border 
                    ${formData?.status === 'PENDING' && 'border-red-400'} 
                    ${formData?.status === 'PAID' && 'border-success'}
                    inline-block p-[2px] rounded-md 
                absolute -right-16 top-14 rotate-45`}
                  >
                    <div
                      className={`w-[290px] p-2 text-center rounded-md text-white font-semibold
                      ${formData?.status === 'PENDING' && 'bg-red-400'} 
                      ${formData?.status === 'PAID' && 'bg-success'}
                    `}
                    >
                      {formData?.status === 'PENDING' && 'BELUM LUNAS'}
                      {formData?.status === 'PAID' && 'SUDAH LUNAS'}
                    </div>
                  </div>
                  <div className='mt-4 mb-10'>
                    <div className='relative w-40 h-14 cursor-pointer'>
                      <Image
                        src='/images/logo-1.png'
                        layout='fill'
                        objectFit='cover'
                        objectPosition='0'
                      />
                    </div>
                    <div className='mt-2'>
                      <div className='font-semibold'>AlsoProject</div>
                      <div className='text-sm -mt-1'>
                        Alamat 1 : Semolowaru Selatan I 80A, Surabaya
                      </div>
                      <div className='text-sm -mt-1'>
                        Alamat 2 : Woro 006/002, Kepohbaru Bojonegoro
                      </div>
                      <div className='text-sm'>https://also.my.id</div>
                    </div>
                  </div>

                  <div className='p-2 bg-gray-200 rounded-md my-10'>
                    <div className='font-semibold'>Invoice #{formData?.no}</div>
                    <div className='flex justify-between'>
                      <div className=''>
                        <small>Tanggal : </small>
                        {moment(formData?.date).format('DD/MM/YYYY')}
                      </div>
                      <div className=''>
                        <small>Jatuh Tempo : </small>
                        {moment(formData?.dueDate).format('DD/MM/YYYY')}
                      </div>
                    </div>
                    {formData?.status === 'PAID' && (
                      <div className=''>
                        <small>Pembayaran diterima pada : </small>
                        {moment(new Date()).format('DD/MM/YYYY')}
                      </div>
                    )}
                  </div>
                  <div className='mb-10'>
                    <div className='font-semibold'>Kepada :</div>
                    <div className='text-sm'>{formData?.billTo}</div>
                    <div className='text-sm'>{formData?.billToAddress}</div>
                    <div className='text-sm'>PIC : {formData?.billToPic}</div>
                  </div>
                  <table className='table table-compact w-full mt-6 mb-10'>
                    <thead>
                      <tr>
                        <th>Keterangan</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData?.items?.map((a: any, index: number) => {
                        return (
                          <tr key={index} className={`tr-${index} align-top`}>
                            <td className='whitespace-pre-line'>
                              {a?.description}
                              <br /> {a?.periodTerm}:{' '}
                              {moment(a?.periodStart).format('DD/MM/YYYY')} s.d.{' '}
                              {moment(a?.periodEnd).format('DD/MM/YYYY')}
                            </td>
                            <td className='text-right'>
                              {formatCurrency(a?.totalAmount)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className='text-right break-words'>Total</td>
                        <td className='text-right'>
                          {formatCurrency(formData?.grandTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div>
                    <div className='font-semibold mb-1'>Pembayaran : </div>
                    <div className='flex gap-4 text-sm'>
                      <div className='border border-gray-400 p-2 rounded-md'>
                        <div>Bank BCA</div>
                        <div className='-mt-1'>No Rek 5200432136</div>
                        <div className='-mt-1'>A/n M. Ali Shodikin</div>
                      </div>
                      <div className='border border-gray-400 p-2 rounded-md'>
                        <div>Bank BRI</div>
                        <div className='-mt-1'>No Rek 058401001899539</div>
                        <div className='-mt-1'>A/n M. Ali Shodikin</div>
                      </div>
                    </div>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 text-center text-xs'>
                    PDF generated on {moment(new Date()).format('DD/MM/YYYY')}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default Invoice;
