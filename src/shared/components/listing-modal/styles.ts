import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
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
