export interface IRequest {
  id?: number;
  quantity: number;
  description: string;

  createdDate?: Date;
  updatedDate?: Date;
}
