/**
* Carrito de compra
*/

export interface BookReservesRequest {
 
    /**
     * Numero de reserva (Referencia de reserva)
     */
    reservesId?: number; //

    /**
     * Codigo id de un libro
     */
    bookId?: number; //

    /**
     * Imagen del libro
     */
    imagePath?: string;

    /**
     * Titulo del libro
     */
    title?: string;

    /**
     * Cantidad por unidad en el carrito de compra
     */
    quantity: number; //

}