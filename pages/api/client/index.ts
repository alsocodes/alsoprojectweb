import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, name, address, phone, picName, picPhone } = req.body;
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
    // const { name, description, periodTerm, date, amount,  } = req.body;
    // const result = await prisma.service.create({
    //   data: {},
    // });
    res.json(result);
  } catch (error) {
    console.log(error?.message);
    res.status(500).json(error);
  }
}
