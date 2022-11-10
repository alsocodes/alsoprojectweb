import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ErrorResponse,
  invalidResponse,
  successResponse,
} from '../../../lib/helper';
import {
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
    const result = await prisma.service.findFirst({
      where: { id: id },
    });
    if (!result) throw new NotfoundException(`Data tidak ditemukan`);
    await prisma.service.delete({
      where: { id: id },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, data: any) => {
  try {
    const { name, description, periodTerm, date, amount, status, clientId } =
      data;

    const service = await prisma.service.findUnique({ where: { id: id } });
    if (!service) throw new NotfoundException('Client tidak ditemukan');

    const checkClient = await prisma.client.findFirst({
      where: { id: clientId },
    });

    if (!checkClient) throw new NotfoundException('Client tidak ditemukan');

    const checkName = await prisma.service.findFirst({
      where: { name: name },
    });

    if (checkName && checkName?.id !== service?.id)
      throw new UniqueConstraintsException(
        `Nama layanan ${name} sudah digunakan`
      );

    const result = await prisma.service.update({
      where: {
        id: service?.id,
      },
      data: {
        name: name,
        description: description,
        date: date,
        periodTerm: periodTerm,
        amount: amount,
        status: status,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
