import { CSSProperties } from "react";
import { APP_COLORS } from "../../../styles";

export default {
  topContainer: {
    width: '100%',
    padding: 20
  },
  titleDescInputAdditional: {
    width: '100%',
    marginBottom: 10,
    maxWidth: "100%"
  },
  titleDescInput: {
    width: '100%',
    maxWidth: "100%"
  },
  priceCurrQuantity: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap'
  } as CSSProperties,
  priceInputAdditional: {
    marginLeft: 6,
    flex: 1,
    // width: '40%',
    maxWidth: "100%"
  },
  priceInput: {
    // marginLeft: 6,
    minWidth: 0,
    maxWidth: '100%',
    width: '100%'
  },
  quantityInputAdditional: {
    flex: 1,
    // width: '40%',
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
  currencyPicker: {
    flex: 2,
    height: 34,
    marginLeft: 6,
    // marginLeft: 12,
    // marginRight: 12
  } as CSSProperties,
  choosefileButton: {
    padding: 40,
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
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
  } as CSSProperties,
  modalCard: {
    padding: 24,
    display: "flex",
  } as CSSProperties,
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 24
  } as CSSProperties,
  cancelButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    backgroundColor: APP_COLORS.BUTTONS.grayButton,
    borderRadius: 12
  } as CSSProperties,
  finalizeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    backgroundColor: APP_COLORS.BUTTONS.green,
    borderRadius: 12
  } as CSSProperties,
  cancelText: {
    color: APP_COLORS.gray
  } as CSSProperties,
  finalizeText: {
    color: APP_COLORS.gray
  } as CSSProperties,
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
  filePickerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 24,
    marginRight: 12,
    // padding: 16
  } as CSSProperties,
  image: {
    height: 80,
    width: 80,
    borderRadius: '50%'
  } as CSSProperties,
};
