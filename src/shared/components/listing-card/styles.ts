import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
  card: {
    display: "flex",
    height: 36,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: APP_COLORS.textGreen,
    boxShadow: "0.25px 0.25px 0 0px gray",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 12,
    paddingRight: 6
  } as CSSProperties,
  indexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 48,
    height: '100%',
    backgroundColor: APP_COLORS.BUTTONS.grayButton,
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as CSSProperties,
  image: {
    width: 24,
    height: 24,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: APP_COLORS.borderGray,
  } as CSSProperties,
  textHigherFlex: {
    flex: 3,
    fontSize: 18,
    color: APP_COLORS.borderGray,
  } as CSSProperties,
  indexText: {
    color: APP_COLORS.borderGray,
    fontSize: 18,
  },
  button: {
    flex: 1,
    height: "100%",
    fontSize: 24,
    color: APP_COLORS.darkGreen,
    backgroundColor: 'transparent',
  },
  tooltipContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    bottom: -180,
    borderRadius: 16,
    zIndex: 999,
    boxShadow: '0px 2px 4px 0px gray',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 12
  } as CSSProperties,
  tooltipButton: {
    display: 'flex',
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  } as CSSProperties,
  tooltipText: {
    fontSize: 16,
    marginLeft: 8,
    color: APP_COLORS.BUTTONS.darkGray
  } as CSSProperties
};
