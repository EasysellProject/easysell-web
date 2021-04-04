import { MarketPlace } from "./integration";
import { CargoCompany, Product } from "./product";

export class Listing extends Product {
  dispatchTime: number;
  stock: number;
  cargoCompanies: CargoCompany[];
  marketPlace: MarketPlace[];
  createdAt: Date;
  currency: "TL" | "$"

  constructor(details?: any) {
    super(details);
    this.dispatchTime = details.dispatchTime;
    this.stock = details.stock;
    this.cargoCompanies = details.cargoCompanies;
    this.marketPlace = details.marketPlace;
    this.currency = details.currency;
    this.createdAt = new Date(details.createdAt);
  }
}
