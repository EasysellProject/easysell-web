import { CSSProperties } from "react";
import { APP_COLORS } from "../../../styles";

export default {
  topContainer: {
    width: '100%',
    padding: 20
  },
  titleDescInputAdditional: {
    width: '100%',
    margin: 10,
    maxWidth: "100%"
  },
  titleDescInput: {
    width: '100%',
    margin: 10,
    maxWidth: "100%"
  },
  priceCurrQuantity: {
    display: "flex",
    flexDirection: 'row'
  } as CSSProperties,
  priceInputAdditional: {
    width: '40%',
    margin: 10,
    maxWidth: "100%"
  },
  priceInput: {
    minWidth: 0, maxWidth: '100%',
    width: '100%'
  },
  currencyInputAdditional: {
    width: '10%',
    margin: 10
  },
  currencyInput: {
    minWidth: 0,
    maxWidth: '100%',
    width: '100%'
  },
  quantityInputAdditional: {
    width: '40%',
    margin: 10
  },
  quantityInput: {
    minWidth: 0,
    maxWidth: '100%',
    width: '100%'
  },
  marketplaceInputAdditional: {
    margin: 10
  },
  marketplaceInput: {
    maxWidth: '100%',
    width: '50%'
  },
  choosefileButton: {
    padding: 40,
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  finalizeButton: {
    padding: 20
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  } as CSSProperties,
  headerText: {
    display: 'flex',
    justifyContent: 'center',
    width: "100%", fontSize: 30
  } as CSSProperties,
  backGrnd: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  } as CSSProperties,
  modalCard: {
    padding: 24,
    display: "flex",
    justifyContent: "flex-end",
    position: "fixed",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: APP_COLORS.textGreen,
    boxShadow: "0px 1px 0px 0px gray",
    borderRadius: 12,
    background: "white",
    width: "50%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2
  } as CSSProperties,
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: APP_COLORS.lightGreen,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 12,
  },
  chooseFileButton: {
    height: "40",
    width: "100",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: APP_COLORS.lightGreen,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 12,
  },
  image: {
    marginLeft: 10,
    width: 36,
    height: 36,
  },
};
