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

        const getData = await get({ skip, take, filter });
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
    console.log('yaya', filter, skip, take);
    const where = { ...filter };
    const result = await prisma.$transaction([
      prisma.client.count({ where }),
      prisma.client.findMany({
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
    const { email, name, address, phone, picName, picPhone } = data;

    const checkEmail = await prisma.client.findUnique({
      where: { email: email },
    });

    if (checkEmail)
      throw new UniqueConstraintsException(`Email ${email} sudah digunakan`);

    const result = await prisma.client.create({
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
