export interface CustomerJwt {
    /**
     * Interface del cliente jwt
     */
    cardId: number; // integer, La identificacion estudiantil o cedula
    name: string;
    lestName: string;
    username: string;
    email: string;
    rol: string;
    numberCellPhone: string;
    
    iat: number;
    exp: number;
}