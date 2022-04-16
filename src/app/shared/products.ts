export interface IProduct {
    countInStock:number,
    featured:boolean,
    name:string,
    price:number,
    category:string,
    categoryName:string;
    description:string,
    image:string[],
    quantity?:number,
    _id:string
}
