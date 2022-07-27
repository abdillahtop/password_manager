export class AppHelper {
  public static PromiseAsyncHelper = async (promiseFunction) => {
    return await promiseFunction
      .then((res) => res)
      .catch((error) => {
        return {
          error: error,
        };
      });
  };
}
