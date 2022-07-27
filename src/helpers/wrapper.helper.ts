export class WrapperHelper {
  public static successResponse = (
    code: number,
    message: string,
    data: object,
    pagination: object,
  ): any => {
    return {
      code: code ? code : 200,
      message: message ? message : '',
      data: data ? data : null,
      pagination: pagination ? pagination : null,
    };
  };

  public static errorResponse = (
    code: number,
    message: string,
    data: object,
    error: any,
  ): any => {
    if (error && error.stack) {
      error = error.stack;
    }

    return {
      code: code ? code : 500,
      message: message ? message : '',
      data: data ? data : null,
      error: error ? error : null,
    };
  };

  public static paginationFunction = (
    datas: any,
    page: number,
    limit: number,
  ) => {
    const offset = (page - 1) * limit;
    const returnResult = [];

    for (const [idx, data] of datas.entries()) {
      if (idx < offset) {
        continue;
      }

      if (returnResult.length >= limit) {
        break;
      }

      returnResult.push(data);
    }

    return returnResult;
  };
}
