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
    const { id }: any = req.query;

    switch (method) {
      case 'GET':
        const getDetail = await getOne(id);
        successResponse(res, 'Get data success', getDetail, 200);
        break;

      case 'PUT':
        const updateData = await update(id, req.body);
        successResponse(res, 'Update data success', updateData, 200);
        break;

      case 'DELETE':
        const deleteAct = await deleteData(id);
        successResponse(res, 'Data deleted', deleteAct, 200);
        break;

      default:
        break;
    }
  } catch (error) {
    ErrorResponse(res, error?.message, null, error?.code);
  }
}

const getOne = async (id: string) => {
  try {
    const result = await prisma.service.findFirst({
      where: { id: id },
    });
    if (!result) throw new NotfoundException(`Data tidak ditemukan`);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteData = async (id: string) => {
  try {
    const result = await prisma.invoice.findFirst({
      where: { id: id },
    });
    if (!result) throw new NotfoundException(`Data tidak ditemukan`);
    await prisma.invoice.delete({
      where: { id: id },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, data: any) => {
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

    const invoice = await prisma.invoice.findUnique({ where: { id: id } });
    if (!invoice) throw new NotfoundException('Invoice tidak ditemukan');

    if (!items || items?.length < 1)
      throw new BadInputException('Items harus diisi minimal 1');

    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) throw new NotfoundException('Client tidak ditemukan');

    const dataCreate: any = {};
    await prisma.invoice.update({
      where: { id: id },
      data: {
        date: date,
        dueDate: dueDate,
        billTo: billTo,
        billToAddress: billToAddress,
        billToPic: billToPic,
        clientId: client?.id,
      },
    });

    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const a = items[i];
      if (a?.serviceId !== 'custom') {
        const check = await prisma.service.findUnique({
          where: { id: a?.serviceId },
        });
        if (!check) throw new NotfoundException('Service tidak ditemukan');
      }

      if (a?.id) {
        const item = await prisma.invoiceItem.findUnique({
          where: { id: a?.id },
        });
        if (!item) throw new NotfoundException('Item invoice tidak ditemukan');
        await prisma.invoiceItem.update({
          where: { id: a?.id },
          data: {
            serviceId: a?.serviceId,
            description: a?.description,
            amount: a?.amount,
            qty: a?.qty,
            totalAmount: a?.qty * a?.amount,
            periodTerm: a?.periodTerm,
            periodStart: a?.periodStart,
            periodEnd: a?.periodEnd,
          },
        });
      } else {
        await prisma.invoiceItem.create({
          data: {
            ...a,
            invoiceId: id,
            totalAmount: a?.qty * a?.amount,
          },
        });
      }
      total += a?.qty * a?.amount;
    }

    await prisma.invoice.update({
      where: { id: id },
      data: { grandTotal: total },
    });

    const result = await prisma.invoice.findUnique({
      where: { id: id },
    });
    return result;
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};
