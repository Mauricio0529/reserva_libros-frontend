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
     * Cantidad por unidad en el carrito de compra
     */
    quantity: number; // localStorage
    
    /**
     * Titulo del libro
     */
    title?: string; // localStorage

    /**
     * Imagen del libro
    */
    imagePath?: string;

    // esto es de la base de datos, para poder mostrarlo en el historial
    author?: string; // localStorage

}