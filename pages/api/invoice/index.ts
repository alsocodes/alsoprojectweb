import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ErrorResponse,
  invalidResponse,
  successResponse,
} from '../../../lib/helper';
import {
  BadInputException,
  NotfoundException,
  UniqueConstraintsException,
} from '../../../lib/exceptions';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        const { page = 1, pageSize = 20, search = '' }: any = req.query;
        const take = parseInt(pageSize);
        const skip: number = (page - 1) * take;

        let filter = {};
        if (search) {
          if (!search.includes(':'))
            return invalidResponse(
              res,
              'Invalid format search, search must key:value'
            );

          const [key, value] = search.split(':');
          filter = { [key]: { contains: value } };
        }

        const getData = await get({
          skip,
          take,
          filter,
        });
        const result = {
          count: getData[0],
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          rows: getData[1],
        };

        successResponse(res, 'Get data success', result);
        break;

      case 'POST':
        const createData = await create(req.body);
        successResponse(res, 'Data created', createData, 201);
        break;

      default:
        break;
    }
  } catch (error) {
    ErrorResponse(res, error?.message, null, error?.code);
  }
}

const get = async (data: any) => {
  try {
    const { skip, take, filter } = data;
    const where = { ...filter };
    const result = await prisma.$transaction([
      prisma.invoice.count({ where }),
      prisma.invoice.findMany({
        select: {
          id: true,
          no: true,
          date: true,
          dueDate: true,
          billTo: true,
          billToAddress: true,
          billToPic: true,
          total: true,
          clientId: true,
          discount: true,
          vatValue: true,
          vatAmount: true,
          grandTotal: true,
          status: true,
          cancelledAt: true,
          paidAt: true,
          paidInfo: true,
          createdAt: true,
          updatedAt: true,
          items: true,
          client: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: where,
        skip,
        take,
      }),
    ]);
    if (result?.[0] === 0) throw new NotfoundException(`Data tidak ditemukan`);

    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data: any) => {
  try {
    const {
      date,
      dueDate,
      billTo,
      billToAddress,
      billToPic,
      clientId,
      items,
    }: any = data;

    if (!items || items?.length < 1)
      throw new BadInputException('Items harus diisi minimal 1');

    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) throw new NotfoundException('Client tidak ditemukan');

    let no: string = '';
    while (no === '') {
      // generate 6 digit number random
      const tmp = Math.floor(100000 + Math.random() * 900000)?.toString();
      const checkNo = await prisma.invoice?.findUnique({ where: { no: tmp } });
      if (!checkNo) no = tmp;
    }

    const dataCreate: any = {};
    const create = await prisma.invoice.create({
      data: {
        no: no,
        date: date,
        dueDate: dueDate,
        billTo: billTo,
        billToAddress: billToAddress,
        billToPic: billToPic,
        clientId: client?.id,
        total: 0,
        grandTotal: 0,
      },
    });

    const dataItems = await Promise.all(
      items?.map(async (a: any) => {
        if (a?.serviceId !== 'custom') {
          const check = await prisma.service.findUnique({
            where: { id: a?.serviceId },
          });
          if (!check) throw new NotfoundException('Service tidak ditemukan');
        }
        return {
          ...a,
          invoiceId: create?.id,
          totalAmount: a?.qty * a?.amount,
        };
        /**TODO
         *
         */
      })
    );

    console.log(dataItems);
    const createItesm = await prisma.invoiceItem.createMany({
      data: dataItems,
    });
    const total = dataItems?.reduce(
      (a: number, b: any) => a + b?.totalAmount,
      0
    );
    await prisma.invoice.update({
      where: { id: create?.id },
      data: { grandTotal: total },
    });

    const result = await prisma.invoice.findUnique({
      where: { id: create?.id },
    });
    return result;
    // await prisma.invoiceItem.createMany({})
    // return result;
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};
