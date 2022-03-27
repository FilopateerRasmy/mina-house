import { IProduct } from "./products";

export interface Ireview {
    product:IProduct,
    rating:number,
    comment:string,
    _id:string,
    user:string
}