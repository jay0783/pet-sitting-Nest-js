import { MainOrderStatusEnum } from '@pawfect/db/entities/enums';
import {
  CustomerViewModel,
  OrderViewModel,
  PetViewModel,
  ServiceViewModel,
  VisitViewModel,
} from '.';

export interface MainOrderViewModel {
  id: string;
  firstDate: number;
  lastDate: number;
  pets: Array<PetViewModel>;
  service: ServiceViewModel;
  status: MainOrderStatusEnum;
  visits: Array<VisitViewModel>;
  orders: Array<OrderViewModel>;
  customer: CustomerViewModel;
}
