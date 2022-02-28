import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";
import { RequestItemDTO } from "./request-item.dto";

export interface RequestDTO {
    customer: RefDTO;
    deliveryAddress: RefDTO;
    payment: PaymentDTO;
    items: RequestItemDTO[];
}