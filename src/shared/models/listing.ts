import { MarketPlace } from "./integration";
import { CargoCompany, Product } from "./product";

export class Listing extends Product {
  dispatchTime: number;
  cargoCompanies: CargoCompany[];
  marketPlace: MarketPlace[];
  createdAt: Date;

  constructor(details?: any) {
    super(details);
    this.dispatchTime = details.dispatchTime;
    this.cargoCompanies = details.cargoCompanies;
    this.marketPlace = details.marketPlace;
    this.createdAt = new Date(details.createdAt);
  }
}
