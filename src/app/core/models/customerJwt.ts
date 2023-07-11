export interface CustomerJwt {
    /**
     * Interface del cliente jwt
     */
    cardId: number; // integer
    name: string;
    lestName: string;
    username: string;
    email: string;
    rol: string;
    numberCellPhone: string;
    
    iat: number;
    exp: number;
}