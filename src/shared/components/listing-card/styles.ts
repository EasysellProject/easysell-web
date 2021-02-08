import { APP_COLORS } from "../../styles";

export default {
  card: {
    display: "flex",
    height: 48,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: APP_COLORS.textGreen,
    boxShadow: "0px 1px 0px 0px gray",
    alignItems: "center",
    margin: 20,
    borderRadius: 12,
  },
  indexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
    width: "100",
    backgroundColor: APP_COLORS.grayButton,
  },
  image: {
    marginLeft: 10,
    width: 36,
    height: 36,
  },
  text: {
    marginLeft: 10,
    flex: 1,
    fontSize: 18,
    color: APP_COLORS.borderGray,
  },
  indexText: {
    color: APP_COLORS.borderGray,
    fontSize: 18,
  },
  button: {
    height: "100%",
    margin: "5",
    padding: "5",
    fontSize: 24,
    color: APP_COLORS.darkGreen,
  },
};
