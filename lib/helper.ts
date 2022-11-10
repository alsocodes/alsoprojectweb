export const successResponse = (
  res: any,
  message: string = 'Success',
  data: any = null,
  code: number = 200
) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

export const invalidResponse = (
  res: any,
  message: string = 'Invalid/Bad Input',
  data: any = null,
  code: number = 400
) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

export const NotfoundResponse = (
  res: any,
  message: string = 'Data Not Found',
  data: any = null,
  code: number = 404
) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

export const ForbiddenResponse = (
  res: any,
  message: string = 'Access Forbidden',
  data: any = null,
  code: number = 403
) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

export const UnAuthorizeResponse = (
  res: any,
  message: string = 'UnAuthorized Access',
  data: any = null,
  code: number = 401
) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

export const ErrorResponse = (
  res: any,
  message: string = 'Server Error',
  data: any = null,
  code: number = 500
) => {
  const ecode = typeof code === 'string' ? 500 : code;
  return res.status(ecode).json({
    success: false,
    message,
    data,
  });
};

/** Format currency number */
export const formatCurrency = (number) => {
  const text = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(number || 0);

  return text
    .replace(/\xa0/g, ' ')
    .replace(/\u202f/g, ' ')
    .replace('Rp ', 'Rp');
};

export const formatNumber = (number) => {
  const text = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  }).format(number || 0);

  return text.replace(/\xa0/g, ' ').replace(/\u202f/g, ' ');
};

export const addCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const removeNonNumeric = (num) =>
  num?.toString().replace(/[^\d,]+/g, '');
export const parsingFloat = (num) =>
  parseFloat(num?.toString()?.replace(',', '.'));
export const floatString = (num) => num?.toString().replace('.', ',');
