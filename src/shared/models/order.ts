import { Address, CargoCompany, Customer, Product } from "./product";

export class Order {
    _id: string
    orderNo: number;
    orderDate: Date;
    dueDate: Date;
    orderedBy: Customer
    cargoCompany: CargoCompany;
    product: Product
    deliveryType: string;
    deliveryAddress: Address;

    constructor(details?: any) {
        this.orderNo = details.orderNo;
        this.orderDate = details.orderDate;
        this.dueDate = details.dueDate;
        this.orderedBy = details.orderedBy;
        this.cargoCompany = details.cargoCompany;
        this.product = new Product(details.product);
        this.deliveryType = details.deliveryType;
        this.deliveryAddress = details.deliveryAddress;
    }
}

