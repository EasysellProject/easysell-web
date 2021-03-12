import { Integration } from "../models/integration";

class IntegrationService {
  username: string;
  password: string;
  authenticationType: string;
  id_token: string;
  merchant_id: string;
  constructor() {}

  authenticateHepsiurada(username: string, password:string, authenticationType:string): string {
    var token = "undefined";
    fetch("https://mpop-sit.hepsiburada.com/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //"enabled":true
      },
      body: JSON.stringify({
        username: username,
        password: password,
        authenticationType: authenticationType,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while authenticating user: Response is not OK");
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
  getAllCategoryInformationHepsiburada(id_token: string): 
  any //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/hepsiburada-kategori-bilgilerini-alma
  {
    var allCategoryData;
    fetch(
      "https://mpop-sit.hepsiburada.com/product/api/categories/get-all-categories",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + id_token, //Bearer Token
          Accept: "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling all categories information: Response is not OK");
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
  ): any //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/kategori-oezelliklerini-alma
  {
    var categoryData;
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/categories/${category_id}/attributes`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + id_token, //Bearer Token
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling a category information: Response is not OK");
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
  ): any //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/oezellik-degerlerini-alma
  {
    var categoryAttributeData;
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/categories/${category_id}/attribute/${attribute_id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + id_token, //Bearer Token
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling a category attributes: Response is not OK");
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
    //https://developers.hepsiburada.com/en/katalog-entegrasyonu/ueruen-bilgisi-goenderme
  ): boolean {
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/products/import	`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + id_token, //Bearer Token
          Accept: "application/json",
        },
        body:JSON.stringify(productData)
      }
    )
    .then((res) => {
        if (!res.ok) {
          throw Error("Error while posting product information: Response is not OK");
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
  getProductConditionHepsiburada(tracking_id: string, page: number, size: number, id_token: string):
  any //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/ueruen-durumu-sorgulama
  {
    var productStatus; //there can be a seperate data object for this
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/products/status/${tracking_id}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer" + id_token,//Bearer Token
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling Product status: Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        productStatus = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return productStatus;
  }

  getTrackIDHistoryHepsiburada(id_token:string):any
  //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/gecmis-traceid-sorgulama
  {
    var trackIDHistory; //there can be a seperate data object for this
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/products/trackingId-history`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer" + id_token,//Bearer Token
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling trackID history: Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        trackIDHistory = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return trackIDHistory;
  }
  getProductStatusHepsiburada(id_token:string):any
  //there can be a seperate data object for this
  //https://developers.hepsiburada.com/en/katalog-entegrasyonu/urun-statu-bilgisi-cekme
  {
    var productStatus; //there can be a seperate data object for this
    fetch(
      `https://mpop-sit.hepsiburada.com/product/api/products/check-product-status?version=1`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer" + id_token,//Bearer Token
          Accept: "application/json",
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while gettling trackID history: Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        productStatus = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return productStatus;
  }

  getMerchantListingDataHepsiburada(merchant_id:string, username:string, password:string):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/merchant-listing-bilgilerini-cekme
  {
    var merchantData:XMLDocument;
    fetch(
      `https://listing-external-sit.hepsiburada.com/listings/merchantid/${merchant_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${username}:${password}`,
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while getting merchant listing data: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((lastData) =>{
        merchantData = lastData;
      }
      )
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return merchantData;
  }
  updateMerchantListingDataHepsiburada(merchant_id:string, username:string, password:string, requestBody: string //string form of XML
    ):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/listing-bilgilerini-guncelleme
  {
    var response:XMLDocument;
    fetch(
      `https://listing-external-sit.hepsiburada.com/listings/merchantid/${merchant_id}/inventory-uploads`,
      {
        method: "POST",
        headers: {
          Authorization: `${username}:${password}`,
          "Content-Type":  "application/xml",
        },
        body: requestBody,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while updating merchant listing data: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((lastData) =>{
        response = lastData;
      }
      )
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return response;
  }

  controlMerchantListingDataUpdateHepsiburada(merchant_id:string, inventoryupload_id:string, username:string, password:string,
    ):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/listing-guncelleme-islem-kontrolu
  {
    var response:XMLDocument;
    fetch(
      `https://listing-external-sit.hepsiburada.com/listings/merchantid/${merchant_id}/inventory-uploads/id/${inventoryupload_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${username}:${password}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while controling listing data update: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((lastData) =>{
        response = lastData;
      }
      )
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return response;
  }

  deleteListingHepsiburada(merchant_id:string, hbsku:string, merchantsku:string, username:string, password:string,):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/listing-silme
  {
    var response = null;
    fetch(
      `https://listing-external-sit.hepsiburada.com/listings/merchantid/${merchant_id}/sku/${hbsku}/merchantsku/${merchantsku}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${username}:${password}`,
          "Content-Type":  "application/xml",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while deleting listing data: Response is not OK");
        }
        return res.text()
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      })
      .then((data)=>{
        response = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return response;
  }
  activateDeactivateListingHepsiburada(merchant_id:string, hbsku:string, username:string, password:string, activate:boolean):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/listing-satisa-acma-kapatma
  {
    var response = null;
    var ending;
    if(activate){
      ending = "activate"
    }
    else{
      ending = "deactivate"
    }
    fetch(
      `https://listing-external-sit.hepsiburada.com/listings/merchantid/${merchant_id}/sku/${hbsku}/${ending}`,
      {
        method: "POST",
        headers: {
          Authorization: `${username}:${password}`,
          "Content-Type":  "application/xml",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error activate / deactivate listing: Response is not OK");
        }
        return res.text()
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      })
      .then((data)=>{
        response = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return response;
  }
  getListOfListings(merchant_id:string, hbsku:string, username:string, password:string, activate:boolean):XMLDocument
  //https://developers.hepsiburada.com/en/listeleme-entegrasyonu/buybox
  {
    var responData = null;
    fetch(
      `https://listing-external-sit.hepsiburada.com/buybox-orders/merchantid/${merchant_id}?skuList=${hbsku}`,
      {
        method: "GET",
        headers: {
          Authorization: `${username}:${password}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while getting list of all listing data: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((data)=>{
        responData = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return responData;
  }
  claimAwaitingActionHepsiburada()
  //https://developers.hepsiburada.com/en/talep%20entegrasyonu/aksiyon-bekleyen-talep-bildirimi
  //documentation is not complete
  {
    
  }
  acceptRequestHepsiburada(number:string, username:string, password:string):XMLDocument
  //https://developers.hepsiburada.com/en/talep%20entegrasyonu/talep-kabul-etme
  {
    var responData = null;
    fetch(
      `https://oms-external-sit.hepsiburada.com/claims/number/${number}/accept`,
      {
        method: "POST",
        headers: {
          Authorization: `${username}:${password}`,
          "Content-type":"application/json"
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error accepting request: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((data)=>{
        responData = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return responData;
  }
  rejestRequestHepsiburada(number:string, username:string, password:string, requestBody:string //string form of json
    ):XMLDocument
  //https://developers.hepsiburada.com/en/talep%20entegrasyonu/talep-reddetme
  {
    var responData = null;
    fetch(
      `https://oms-external-sit.hepsiburada.com/claims/number/${number}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `${username}:${password}`,
          "Content-type":"application/json"
        },
        body:requestBody
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error accepting request: Response is not OK");
        }
        return res.text();
      })
      .then((data) => {
        return (new window.DOMParser()).parseFromString(data, "text/xml")
      }).then((data)=>{
        responData = data
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return responData;
  }
  claimPackageHepsiburada(){}
  //https://developers.hepsiburada.com/en/talep%20entegrasyonu/talep-kabul-red-sonucu-olusan-paket-bildirimi
  //document is not complete

  getListOfPaymentsAndInvoices(merchant_id:string, startDate:Date, endDate:Date, transactiontype:string, useInvoiceDate:boolean, username:string, password:string):any
  //https://developers.hepsiburada.com/en/muhasebe-entegrasyonu/odeme-ve-faturalar
  {
    var responData = null;
    fetch(
      `https://mpfinance-external.hepsiburada.com/invoices/merchantid/${merchant_id}/transactiontype/Payment,Commission,Return?startDate=${startDate}&endDate=${endDate}&useInvoiceDate=${useInvoiceDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `${username}:${password}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Error while getting list of all payments and invoices: Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        responData = data;
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
      return responData;
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
          Accept: "application/json", //this is actually "Content-type"
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
