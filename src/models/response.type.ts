type SucceedResponse<T> = {
  data: T;
  error?: undefined
};

type FailedResponse = {
  data?: undefined
  error: { message: string };
};

type Response<T> = SucceedResponse<T> | FailedResponse;

export default Response;
