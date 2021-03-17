import { Integration } from "../models/Integration";
import GetProductByProductIdRequest from "n11-client";
import Authentication from "n11-client";
import ProductServicePortService from "n11-client"
import DeleteProductByIdRequest from "n11-client"
import ProductSkuBasicRequestItemList from "n11-client"
import ProductSkuRequest from "n11-client"
import UpdateProductPriceByIdRequest from "n11-client"
import ProductSellingServicePortService from "n11-client"
import StartSellingProductByProductIdRequest from "n11-client"
import StopSellingProductByProductIdRequest from "n11-client"
import StockItemForUpdateStockWithId from "n11-client"
import StockItemForUpdateStockWithIdList from "n11-client"
import UpdateStockByStockIdRequest from "n11-client"
import ProductStockServicePortService from "n11-client"
import OrderServicePortService from "n11-client"
import OrderSearchPeriod from "n11-client"
import DetailedOrderListRequest from "n11-client"
import PagingData from "n11-client"
import OrderDataListRequest from "n11-client"
import OrderDataRequest from "n11-client"
import OrderDetailRequest from "n11-client"
import SaveProductRequest from "n11-client"
import CategoryRequest from "n11-client"
import ProductAttributeRequestList from "n11-client"
import ProductAttributeRequest from "n11-client"
import ProductImageList from "n11-client"
import ProductImage from "n11-client"
import ProductRequest from "n11-client"
import ProductSkuRequestList from "n11-client"
import UpdateProductBasicRequest from "n11-client"
import ProductUpdateSkuBasicRequestItemList from "n11-client"
import SellerProductDiscount from "n11-client"
import ProductUpdateSkuBasicRequest from "n11-client"

import ProductServicePort from "n11-client"
import GetProductByProductIdResponse from "n11-client"
import Product from "n11-client"
import DeleteProductByIdResponse from "n11-client"
import UpdateProductPriceByIdResponse from "n11-client"
import ProductBasic from "n11-client"
import ProductSellingServicePort from "n11-client"
import StartSellingProductByProductIdResponse from "n11-client"
import UpdateStockByStockIdResponse from "n11-client"
import ProductStockServicePort from "n11-client"
import DetailedOrderListResponse from "n11-client"
import OrderServicePort from "n11-client"
import OrderDetailData from "n11-client"
import OrderDetailResponse from "n11-client"
import SaveProductResponse from "n11-client"
import UpdateProductBasicResponse from "n11-client"
import DetailedOrderData from "n11-client"
import OrderSearchData from "n11-client"

class N11Integration {
     
    strAppKey: string;
    strAppSecret: string;
    authentication: Authentication;

    constructor() 
    {
        this.authentication = new Authentication();
        this.authentication.setAppKey(this.strAppKey);
        this.authentication.setAppSecret(this.strAppSecret);
    }

    getProductInfoWithProductID(productIdValue: bigint): any
    {
        let request = new GetProductByProductIdRequest();
        request.setAuth(this.authentication);
        request.setProductId(productIdValue);
        let port = new ProductServicePort();
        port = new ProductServicePortService().getProductServicePortSoap11();
        let response = new GetProductByProductIdResponse();
        response = port.getProductByProductId(request);
        let sampleProduct = new Product();
        sampleProduct = response.getProduct();
        console.log("Product name: " + sampleProduct.getTitle());
        return response.getResult();
    }

    deleteProductByID(productID: bigint): any
    {
        let deleteProductByIdRequest = new DeleteProductByIdRequest();
        deleteProductByIdRequest.setAuth(this.authentication);
        deleteProductByIdRequest.setProductId(productID);
        let port = new ProductServicePort();
        port = new ProductServicePortService().getProductServicePortSoap11();
        let deleteProductByIdResponse = new DeleteProductByIdResponse();
        deleteProductByIdResponse = port.deleteProductById(deleteProductByIdRequest);    
        console.log("Product deleted\n");
        return deleteProductByIdResponse.getResult(); 
    }

    updateProductPriceByID(productIdValue: string, strSellerStockCode: string, currencyTypeValue: number, optionalPriceValue: number, priceValue: number): any
    {
        let productSkuBasicRequestItemList = new ProductSkuBasicRequestItemList();
        let productSkuRequest = new ProductSkuRequest();
        productSkuRequest.setSellerStockCode(strSellerStockCode);
        productSkuRequest.setOptionPrice(optionalPriceValue);
    
        let updateProductPriceByIdRequest = new UpdateProductPriceByIdRequest();
        updateProductPriceByIdRequest.setAuth(this.authentication);
        updateProductPriceByIdRequest.setProductId(productIdValue);
        updateProductPriceByIdRequest.setCurrencyType(currencyTypeValue);
        updateProductPriceByIdRequest.setStockItems(productSkuBasicRequestItemList);
        updateProductPriceByIdRequest.setPrice(priceValue);
        let port = new ProductServicePort();
        port = new ProductServicePortService().getProductServicePortSoap11();
        let response = new UpdateProductPriceByIdResponse();
        response = port.updateProductPriceById(updateProductPriceByIdRequest);
        let sampleProduct = new ProductBasic();
        sampleProduct = response.getProduct();
    
        console.log("Product's price " + sampleProduct.getPrice() + " is updated as " + sampleProduct.getDisplayPrice());
        return response.getResult();
    }

    StartSellingProductByProductId(productIdValue: bigint):any
    {
        let request = new StartSellingProductByProductIdRequest();
        request.setAuth(this.authentication);
        request.setProductId(productIdValue);
        let port = new ProductSellingServicePort();
        port = new ProductSellingServicePortService().getProductSellingServicePortSoap11();
        let response = new StartSellingProductByProductIdResponse();
        response = port.startSellingProductByProductId(request);
        let sampleProduct = new ProductBasic();
        sampleProduct = response.getProduct();

        console.log(sampleProduct.getId() + " has been activated.");
        return response.getResult();
    }

    StopSellingProductByProductId(productIdValue: bigint): any
    {
        let request = new StopSellingProductByProductIdRequest();
        request.setAuth(this.authentication);
        request.setProductId(productIdValue);
        let port = new ProductSellingServicePort()
        port = new ProductSellingServicePortService().getProductSellingServicePortSoap11();
        let response = new StopSellingProductByProductIdRequest();
        response = port.stopSellingProductByProductId(request);
        let sampleProduct = new ProductBasic();
        sampleProduct = response.getProduct();
        
       console.log(sampleProduct.getId() + " has been stopped.");
       return response.getResult();
    }
 
    updateStockByStockId(versionValue: bigint, stockIdValue: bigint, quantityValue: number): any
    {
        let stockItemList = new StockItemForUpdateStockWithIdList();
        let stockItem = new StockItemForUpdateStockWithId();
        stockItem.setVersion(versionValue);
        stockItem.setId(stockIdValue);
        stockItem.setQuantity(quantityValue);
        stockItemList.getStockItem().add(stockItem);

        let updateStockByStockIdRequest = new UpdateStockByStockIdRequest();
        updateStockByStockIdRequest.setAuth(this.authentication);
        updateStockByStockIdRequest.setStockItems(stockItemList);


        let port = new ProductStockServicePort();
        port = new ProductStockServicePortService().getProductStockServicePortSoap11();
        let response = new UpdateStockByStockIdResponse();
        response = port.updateStockByStockId(updateStockByStockIdRequest);

        console.log("Update status is " + response.getResult().getStatus().getValue());
        return response.getResult();
    }

    DetailedOrderList(strStartDate: string, strEndDate: string, strOrderStatus: string, strRecipient: string, strBuyerName: string,
         strOrderNumber: string, strProductSellerCode: string, productIdValue: bigint, totalCountValue: bigint, currentPageValue: number, 
         pageCountValue: number, pageSizeValue: number ): any
    {

        let orderSearchPeriod = new OrderSearchPeriod();
        orderSearchPeriod.setStartDate(strStartDate);
        orderSearchPeriod.setEndDate(strEndDate);

        let orderDataListRequest = new OrderDataListRequest();
        orderDataListRequest.setProductSellerCode(strProductSellerCode);
        orderDataListRequest.setRecipient(strRecipient);
        orderDataListRequest.setPeriod(orderSearchPeriod);
        orderDataListRequest.setBuyerName(strBuyerName);
        orderDataListRequest.setProductId(productIdValue);
        orderDataListRequest.setOrderNumber(strOrderNumber);
        orderDataListRequest.setStatus(strOrderStatus);

        let pagingData = new PagingData();
        pagingData.setCurrentPage(currentPageValue);
        pagingData.setPageCount(pageCountValue);
        pagingData.setPageSize(pageSizeValue);
        pagingData.setTotalCount(totalCountValue);

        let request = new DetailedOrderListRequest();
        request.setAuth(this.authentication);
        request.setPagingData(pagingData);
        request.setSearchData(orderDataListRequest);

        let port = new OrderServicePort();
        port = new OrderServicePortService().getOrderServicePortSoap11();
        let response = new DetailedOrderListResponse();
        response = port.detailedOrderList(request);
        let orderList =  Array <DetailedOrderData>();
        orderList = response.getOrderList().getOrder();
        let sampleOrder = new DetailedOrderData();
        for (sampleOrder in orderList ) 
        {

            console.log("Order ID: " + sampleOrder.getId());
        }
        return response.getResult();
    }

    orderDetail(orderIdValue: bigint): any
    {
        let orderDataRequest = new OrderDataRequest();
        orderDataRequest.setId(orderIdValue);

        let request = new OrderDetailRequest();
        request.setAuth(this.authentication);
        request.setOrderRequest(orderDataRequest);

        let port = new OrderServicePort();
        new OrderServicePortService().getOrderServicePortSoap11();
        let orderDetailResponse = new OrderDetailResponse()
        orderDetailResponse = port.orderDetail(request);
        let orderDetail = new OrderDetailData();
        orderDetail = orderDetailResponse.getOrderDetail();
        console.log("Order number: " + orderDetail.getOrderNumber());

        let orderItemList: OrderSearchData[] = [];
        orderItemList = orderDetail.getItemList().getItem();
        let sampleItem = new OrderSearchData();
        for (sampleItem in orderItemList ) 
        {

            console.log("Order item ID: " + sampleItem.getId());
        }
        return orderDetailResponse.getResult();
    }
    SaveProduct(strUrl: string, strSellerStockCode: string, strSellerStockCode1:string, strAttributeName: string,
        strAttributeValue: string, strSkuAttributeKey: string, strSkuAttributeValue: string,strSkuAttributeValue1:string, 
        strProductTitle: string, strProductSubtitle: string, strProductSellerCode: string, strProductCondition: string,
        strShipmentTemplate: string, strProductDescription: string, strGtin: string, strGtin1: string, setOrderValue: number,
        quantityValue: number, quantityValue1: number, categoryIdValue: number, priceValue: number, currencyTypeValue: number, 
        approvalStatusValue: number, preparingDayValue: number  ):any
    {
        let productImage = new ProductImage();
        let productImageList = new ProductImageList();
        productImage.setUrl(strUrl);
        productImage.setOrder(setOrderValue);
        productImageList.getImage().add(productImage);

        let skuAttributeRequestList = new ProductAttributeRequestList();
        let skuAttributeRequest = new ProductAttributeRequest();
        skuAttributeRequest.setName(strSkuAttributeKey);
        skuAttributeRequest.setValue(strSkuAttributeValue);
        skuAttributeRequestList.getAttribute().add(skuAttributeRequest);

        let skuAttributeRequestList1 = new ProductAttributeRequestList();
        let skuAttributeRequest1 = new ProductAttributeRequest();
        skuAttributeRequest1.setName(strSkuAttributeKey);
        skuAttributeRequest1.setValue(strSkuAttributeValue1);
        skuAttributeRequestList1.getAttribute().add(skuAttributeRequest1);

        let stockItems = new ProductSkuRequestList();

        let sku = new ProductSkuRequest();
        sku.setSellerStockCode(strSellerStockCode);
        sku.setAttributes(skuAttributeRequestList);
        sku.setQuantity(quantityValue);
        sku.setGtin(strGtin);

        let sku1 = new ProductSkuRequest();
        sku1.setSellerStockCode(strSellerStockCode1);
        sku1.setAttributes(skuAttributeRequestList1);
        sku1.setQuantity(quantityValue1);
        sku1.setGtin(strGtin1);

        stockItems.getStockItem().add(sku);
        stockItems.getStockItem().add(sku1);

        let categoryRequest = new CategoryRequest();
        categoryRequest.setId(categoryIdValue);

        let productAttribute = new ProductAttributeRequest();
        productAttribute.setName(strAttributeName);
        productAttribute.setValue(strAttributeValue);
        let productAttributeRequestList = new ProductAttributeRequestList();
        productAttributeRequestList.getAttribute().add(productAttribute);

        let productRequest = new ProductRequest();
        productRequest.setTitle(strProductTitle);
        productRequest.setSubtitle(strProductSubtitle);
        productRequest.setDescription(strProductDescription);
        productRequest.setCategory(categoryRequest);
        productRequest.setProductSellerCode(strProductSellerCode);
        productRequest.setPrice( priceValue);
        productRequest.setCurrencyType( currencyTypeValue);
        productRequest.setImages(productImageList);
        productRequest.setApprovalStatus( approvalStatusValue);
        productRequest.setPreparingDay( preparingDayValue);
        productRequest.setStockItems(stockItems);
        productRequest.setProductCondition(strProductCondition);
        productRequest.setShipmentTemplate(strShipmentTemplate);
        productRequest.setAttributes(productAttributeRequestList);

        let saveProductRequest = new SaveProductRequest();
        saveProductRequest.setAuth(this.authentication);
        saveProductRequest.setProduct(productRequest);

        let port = new ProductServicePort();
        port = new ProductServicePortService().getProductServicePortSoap11();
        let response = new SaveProductResponse();
        response = port.saveProduct(saveProductRequest);

        console.log("Saving product " + response.getProduct().getId() + " is " + response.getResult().getStatus().getValue());
        return response.getResult();
    }

    updateProductBasic(strProdSellerCode: string,strDiscountStartDate: string, strDiscountEndDate: string, strSellerStockCode: string, 
        priceDec: number, productIdVal: bigint, discountTypeVal: number, discountValueVal: number, stockQuantityVal: number,
        stockIdVal: number, stockOptionPriceVal: number): any
    {
        
        let sellerProductDiscount = new SellerProductDiscount();
        sellerProductDiscount.setDiscountType(discountTypeVal);
        sellerProductDiscount.setDiscountValue(discountValueVal);
        sellerProductDiscount.setDiscountStartDate(strDiscountStartDate);
        sellerProductDiscount.setDiscountEndDate(strDiscountEndDate);
    
        let productUpdateSkuBasicRequest = new ProductUpdateSkuBasicRequest();
        productUpdateSkuBasicRequest.setSellerStockCode(strSellerStockCode);
        productUpdateSkuBasicRequest.setOptionPrice(stockOptionPriceVal);
        productUpdateSkuBasicRequest.setId(stockIdVal);
     
        let productUpdateSkuBasicRequestItemList = new ProductUpdateSkuBasicRequestItemList();
        productUpdateSkuBasicRequestItemList.getStockItem().add(productUpdateSkuBasicRequest);
    
        let request = new UpdateProductBasicRequest();
        request.setProductSellerCode(strProdSellerCode);
        request.setPrice(priceDec);
        request.setAuth(this.authentication);
        request.setProductId(productIdVal);
        request.setProductDiscount(sellerProductDiscount);
        request.setStockItems(productUpdateSkuBasicRequestItemList);
    
        let port = new ProductServicePort();
        new ProductServicePortService().getProductServicePortSoap11();
        let response = new UpdateProductBasicResponse();
        response = port.updateProductBasic(request);
    
        console.log(response.getProduct().getId() + " Display price:" + response.getProduct().getDisplayPrice() + " Price:" + response.getProduct().getPrice());
        return response.getResult();
    }
    
    
    

    getIntegrations(): Integration[] {
        // implement here

        return []
    }
}

export default new N11Integration();