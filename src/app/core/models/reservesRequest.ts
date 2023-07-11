import { BookReservesRequest } from "./bookReservesRequest";


export interface ReservesRequest {
    
    customerCardId: number; // number

    totalReserves: number;

    // fecha entrega
    dateDelivery: Date;

    // fecha reserva
    dateReserves: Date;


    bookReservesEntities: Array<BookReservesRequest>;
}