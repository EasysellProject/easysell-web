import { Integration } from "../models/integration";

class IntegrationService {
  username: string;
  password: string;
  authenticationType: string;
  id_token: string;
  merchant_id: string;
  constructor() {}

  authenticateHepsiurada(): string {
    var token = "undefined";
    fetch("https://mpop-sit.hepsiburada.com/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //"enabled":true
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
        authenticationType: this.authenticationType,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("No such User");
        }
        return res.json();
      })
      .then((data) => {
        token = data.id_token;
      })
      .catch((err) => {
        console.log(err.message);
      });
    this.id_token = token;
    return token;
  }
  getAllCategoryInformationHepsiburada(token: string): any {
    var allCategoryData;
    fetch(
      "https://mpop-sit.hepsiburada.com/product/api/categories/get-all-categories",
      {
        method: "GET",
        headers: { Authorization: token, Accept: "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        allCategoryData = data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return allCategoryData;
  }
  getCategoryInformationHepsiburada(
    id_token: string,
    category_id: number
  ): any {
    var categoryData;
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/categories/${category_id}/attributes`,
      {
        method: "GET",
        headers: {
          Authorization: id_token,
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        categoryData = data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return categoryData;
  }
  getCategoryAttributesHepsiburada(
    category_id: number,
    attribute_id: number,
    id_token: string
  ): any {
    var categoryAttributeData;
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/categories/${category_id}/attribute/${attribute_id}`,
      {
        method: "GET",
        headers: {
          Authorization: id_token,
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        categoryAttributeData = data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return categoryAttributeData;
  }

  postProductInfoHepsiburada(
    id_token: string,
    productData:any, //there should be a seperate object for product data.
  ): boolean {
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/products/import	`,
      {
        method: "POST",
        headers: {
          Authorization: id_token,
          Accept: "application/json",
        },
        body:JSON.stringify(productData)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  sitCreateOrderHepsiburada(
    orderData:any, //order data https://developers.hepsiburada.com/en/siparis-entegrasyonu/test-icin-siparis-olusturma
  ): boolean {
    fetch(
      `https://oms-stub-external-sit.hepsiburada.com/orders/merchantid/`+this.merchant_id,
      {
        method: "POST",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        },
        body:JSON.stringify(orderData)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  payedOrdersHepsiburada(): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/orders/merchantid/`+this.merchant_id,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }


  
  listCargoCompanyForOrderHepsiburada(orderId: string): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/delivery/changeablecargocompanies/merchantid/`+this.merchant_id+`/orderlineid/`+orderId,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  
  changeCargoCompanyHepsiburada(orderId: string,changeCargo: string): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/delivery/changeablecargocompanies/merchantid/`+this.merchant_id+`/orderlineid/`+orderId+`/cargocompany`,
      {
        method: "PUT",
        headers: {
          Authorization: this.username+":"+this.password
        },
        body:JSON.stringify(changeCargo)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }


  

  
  packedListCargoCompanyForOrderHepsiburada(packageNumber: string): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber+`/changablecargocompanies`,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  
  packetChangeCargoCompanyHepsiburada(packageNumber: string,changeCargo: string): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber+`/changecargocompany`,
      {
        method: "PUT",
        headers: {
          Authorization: this.username+":"+this.password
        },
        body:JSON.stringify(changeCargo)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  getListOfPackagableWithLineItemsHepsiburada(
    lineitemid:string, 
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/lineitems/merchantid/`+this.merchant_id+`/packageablewith/lineitemid/`+lineitemid,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  packageCreateHepsiburada(
    packageData:any, 
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id,
      {
        method: "POST",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        },
        body:JSON.stringify(packageData)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  packageUnpackHepsiburada(
    packageNumber:string, 
  ): boolean {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber+`/unpack`,
      {
        method: "POST",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }


  listUnpackedHepsiburada(
    limit:string,
    offset:string,
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/status/unpacked?limit=`+limit+`&offset=`+offset,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  getMerchantPackagesHepsiburada(
    limit:string,
    offset:string,
    timeSpan:string,
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`?timespan=`+timeSpan+`&limit=`+limit+`&offset=`+offset,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }


  getPackagesCargoInfoHepsiburada(
    packageNumber:string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }




  getListOfOrderDetailsHepsiburada(
    ordernumber :string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/orders/merchantid/`+this.merchant_id+`/ordernumber/`+ordernumber,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }



  
  getCampaignInfoListHepsiburada(
    ordernumber :string
  ): any {
    fetch(
      `https://oms-external.hepsiburada.com/orders/merchantid/`+this.merchant_id+`/ordernumber/`+ordernumber+`/campaigns`,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  sendInvoiceLinkHepsiburada(
    packageNumber :string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber+`/invoice`,
      {
        method: "PUT",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  sameLabelHepsiburada(
    packageNumber :string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/packages/merchantid/`+this.merchant_id+`/packagenumber/`+packageNumber+`/labels`,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  getMerchantClaimsHepsiburada(
    limit :string,
    offset:string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/claims/merchantid/`+this.merchant_id+`?offset=`+offset+`&limit=`+limit,
      {
        method: "GET",
        headers: {
          Authorization: this.username+":"+this.password,
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  
  sendCancelInfoHepsiburada(
    lineitemid:string
  ): any {
    fetch(
      `https://oms-external-sit.hepsiburada.com/lineitems/merchantid/`+this.merchant_id+`/id/`+lineitemid+`/cancelbymerchant`,
      {
        method: "POST",
        headers: {
          Authorization: this.username+":"+this.password,
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("User data not coming");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
      return false;
  }

  
  
  getIntegrations(): Integration[] {
    // implement here
    return [];
  }
}

export default new IntegrationService();
