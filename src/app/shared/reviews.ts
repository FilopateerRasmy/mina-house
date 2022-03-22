import { IProduct } from "./products";

export interface Ireview {
    product:IProduct,
    rating:number,
    comment:string,
}