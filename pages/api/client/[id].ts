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
    const result = await prisma.client.findFirst({
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
    const result = await prisma.client.findFirst({
      where: { id: id },
    });
    if (!result) throw new NotfoundException(`Data tidak ditemukan`);
    await prisma.client.delete({
      where: { id: id },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, data: any) => {
  try {
    const { email, name, address, phone, picName, picPhone } = data;

    const client = await prisma.client.findUnique({ where: { id: id } });
    if (!client) throw new NotfoundException('Client tidak ditemukan');

    const checkEmail = await prisma.client.findUnique({
      where: { email: email },
    });

    if (checkEmail && checkEmail?.id !== client?.id)
      throw new UniqueConstraintsException(`Email ${email} sudah digunakan`);

    const result = await prisma.client.update({
      where: {
        id: client?.id,
      },
      data: {
        email: email,
        name: name,
        address: address,
        phone: phone,
        picName: picName,
        picPhone: picPhone,
        deletedAt: null,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
