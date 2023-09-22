export interface CustomerResponseDto {
    /**
    * Interface del cliente response
    */
    cardId: number;
    name: string;
    lestName: string;
    username: string;
    password: string,
    email: string;
    active: number,
    rol: string;
    numberCellPhone: string;
    
    ///iat: number;
    //exp: number;
}