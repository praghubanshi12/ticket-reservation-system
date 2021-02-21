import {FlightDetails} from "../../flight/model/flight-details";
import {Customer} from "../../customer/model/customer";
import {FlightDepartureTime} from "../../flight/model/flight-departure-time";

export class Reservation {
  id: bigint | undefined;
  customer: Customer | undefined;
  flightDetails: FlightDetails | undefined;
  flightDepartureTime: FlightDepartureTime | undefined;
  reservationDate: Date | undefined;
  paid: boolean | undefined;
}
