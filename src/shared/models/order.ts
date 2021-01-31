import { Address, CargoCompany, Customer, Product } from "./product";

export class Order extends Product {
    orderNo: number;
    orderDate: Date;
    dueDate: Date;
    orderedBy: Customer
    cargoCompany: CargoCompany;
    items: Product[]
    deliveryType: string;
    deliveryAddress: Address;

    constructor(details?: any) {
        super(details)
        this.orderNo = details.orderNo;
        this.orderDate = details.orderDate;
        this.dueDate = details.dueDate;
        this.orderedBy = details.orderedBy;
        this.cargoCompany = details.cargoCompany;
        this.items = details.items.map(i => new Product(i));
        this.deliveryType = details.deliveryType;
        this.deliveryAddress = details.deliveryAddress;
    }
}

