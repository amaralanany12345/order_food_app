import { Cart } from "./cart";
import { Ifoods } from "./ifoods";

export interface Orders {
    email:string,
    customerNumber:string,
    address:string,
    customerCart:any[],
    total:number,
    history:Date
}
