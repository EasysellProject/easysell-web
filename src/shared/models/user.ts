import IntegrationService from "../services/integration-service";
import { LangCode } from "../utils/localization";
import { Integration } from "./integration";
import { Listing } from "./listing"

export class User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  lang: LangCode;
  integrations: Integration[];
  listings: Listing[] = [];

  constructor(details?: any) {
    this._id = details._id;
    this.firstname = details.firstname;
    this.lastname = details.lastname;
    this.email = details.email;
    this.lang = details.lang;
    this.integrations = IntegrationService.getIntegrations();
    this.listings = details.listings.map(listing => new Listing(listing));
  }

  get name(): string {
    return this.firstname + " " + this.lastname;
  }
}
