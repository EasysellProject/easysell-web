import { MarketPlace } from "./integration";

export class Product {
  _id: string;
  title: string;
  desc?: string;
  price: number;
  attributes?: Attribute[];
  img: string;

  constructor(details?: any) {
    this._id = details._id;
    this.title = details.title;
    if (details.desc) this.desc = details.desc;
    this.price = details.price;
    if (details.attributes) this.attributes = details.attributes;
    this.img = details.img;
  }
}

export type Attribute = { _id: string; value: string };
export type Customer = {
  _id: string;
  market: MarketPlace;
};

export type CargoCompany = {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
  trackUrl?: string;
};

export type Address = {
  address: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  city: string;
  town: string;
};
