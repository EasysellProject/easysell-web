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
  },
  indexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 48,
    height: '100%',
    backgroundColor: APP_COLORS.BUTTONS.grayButton,
  },
  image: {
    width: 36,
    height: 36,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: APP_COLORS.borderGray,
  },
  indexText: {
    height: '100%',
    color: APP_COLORS.borderGray,
    fontSize: 18,
  },
  button: {
    height: "100%",
    fontSize: 24,
    color: APP_COLORS.darkGreen,
  },
};
