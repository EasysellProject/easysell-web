import { MarketPlace } from "./integration";
import { CargoCompany, Product } from "./product";

export class Listing {
  _id: string;
  product: Product;
  dispatchTime: number;
  cargoCompanies: CargoCompany[];
  marketPlace: MarketPlace[] = [];
  createdAt: Date;

  constructor(details?: any) {
    if (details) {
      this._id = details._id
      this.dispatchTime = details.dispatchTime || [];
      this.product = new Product(details.product);
      this.cargoCompanies = details.cargoCompanies || [];
      this.marketPlace = details.marketPlace || [];
      this.createdAt = new Date(details.createdAt);
    }
  }
  copy(): Listing {
    return Object.assign({}, this)
  }
}
