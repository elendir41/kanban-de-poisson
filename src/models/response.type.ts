type SucceedResponse<T> = {
  success: true;
  data: T;
};

type FailedResponse = {
  success: false;
  error: string;
};

type Response<T> = SucceedResponse<T> | FailedResponse;

export default Response;
