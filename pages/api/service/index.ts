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
      prisma.service.count({ where }),
      prisma.service.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          amount: true,
          status: true,
          date: true,
          activeTill: true,
          periodTerm: true,
          createdAt: true,
          updatedAt: true,
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
      name,
      description,
      periodTerm,
      date,
      amount,
      status,
      clientId,
    }: any = data;

    const checkClient = await prisma.client.findFirst({
      where: { id: clientId },
    });

    if (!checkClient) throw new NotfoundException('Client tidak ditemukan');

    const checkName = await prisma.service.findFirst({
      where: { name: name },
    });

    if (checkName)
      throw new UniqueConstraintsException(
        `Nama layanan ${name} sudah digunakan`
      );

    const result = await prisma.service.create({
      data: {
        name: name,
        description: description,
        periodTerm: periodTerm,
        date: date,
        activeTill: null,
        amount: parseFloat(amount),
        clientId: clientId,
        status: status,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
