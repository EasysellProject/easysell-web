export class Integration {

    _id: string
    market: MarketPlace
    constructor(details?: any) {
        this._id = details._id
        this.market = details.market
    }
}

export type MarketPlace =
    "Hepsiburada"
    | "Trendyol"