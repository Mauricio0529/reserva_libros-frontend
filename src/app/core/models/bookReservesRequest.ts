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
    bookId?: number; // localStorage

    /**
     * Imagen del libro
     */
    imagePath?: string;

    /**
     * Titulo del libro
     */
    title?: string; // localStorage

    /**
     * Cantidad por unidad en el carrito de compra
     */
    quantity: number; // localStorage

    // esto es de la base de datos, para poder mostrarlo en el historial
    author?: string; // localStorage

}