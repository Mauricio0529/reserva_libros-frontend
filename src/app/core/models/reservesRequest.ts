import { BookReservesRequest } from "./bookReservesRequest";


export interface ReservesRequest {
    
    customerCardId: number; // number

    totalReserves: number;

    professionalCareers?: number;

    professionalCycle?: number;

    semester?: number;

    // fecha entrega
    dateDelivery: Date;

    // fecha reserva
    dateReserves: Date;

    bookReservesEntities: Array<BookReservesRequest>;
}