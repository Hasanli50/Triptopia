export type ClientFeedbackResponse<T> = {
  status: string;
  message: string;
  data: {
    clientFeedback: T;
    total: number;
    pageCount: number;
  };
};

export interface IClientFeedback {
  id: string;
  userId: string;
  rating: number;
  review: string;
}
