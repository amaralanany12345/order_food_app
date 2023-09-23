import { Ifoods } from "./ifoods";

export interface Cart {
    username:string,
    email:string,
    id:number,
    foods:Ifoods,
    quantity:number
}
