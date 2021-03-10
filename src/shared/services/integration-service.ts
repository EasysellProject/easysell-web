import { Integration } from "../models/integration";

class IntegrationService {
  username: string;
  password: string;
  authenticationType: string;
  id_token: string;
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


  getIntegrations(): Integration[] {
    // implement here
    return [];
  }
}

export default new IntegrationService();
