import {Reservation} from "../../reservation/model/reservation";

export class Payment {
  id : bigint | undefined;
  reservation : Reservation | undefined;
}
