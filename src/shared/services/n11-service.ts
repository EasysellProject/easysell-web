import { Integration } from "../models/Integration";
import GetProductByProductIdRequest from "n11-client";
import Authentication from "n11-client";
	
class N11Integration {
     
    strAppKey: string;
    strAppSecret: string;

    constructor() 
    {
        const authentication = new Authentication();
        authentication.setAppKey(this.strAppKey);
        authentication.setAppSecret(this.strAppSecret);
    }
    getProductInfoWithProductID(productID: string): string
    {
        return ""
        
    }
    

    getIntegrations(): Integration[] {
        // implement here

        return []
    }
}

export default new N11Integration();