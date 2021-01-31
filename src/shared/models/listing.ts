import { MarketPlace } from "./integration";
import { CargoCompany, Product } from "./product";

export class Listing extends Product {
    dispatchTime: number;
    stock: number;
    cargoCompanies: CargoCompany[];
    marketPlace: MarketPlace[];
    createdAt: Date

    constructor(details?: any) {
        super(details)
        this.dispatchTime = details.dispatchTime;
        this.stock = details.stock;
        this.cargoCompanies = details.cargoCompanies;
        this.marketPlace = details.marketPlace;
        console.log('created at ', new Date(details.createdAt))
        this.createdAt = new Date(details.createdAt)
    }
}