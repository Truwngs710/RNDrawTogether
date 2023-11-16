import { PrimaryColor, windowHeight, windowWidth } from "../constant";
import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  returnDraw: { width: 50, height: 50, backgroundColor: "red" },
  container: {
    backgroundColor: PrimaryColor,
    flex: 1,
    width: "100%",
  },
  canvas: {
    flex: 1,
    marginVertical: (windowHeight - windowWidth) / 2 + 20,
    width: windowWidth - 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  strokeOption: {
    fontSize: 18,
    backgroundColor: "#898989",
  },
  toolbarContainer: {
    paddingTop: 25,
    position: "absolute",
    alignSelf: "center",
  },
  toolbar: {
    backgroundColor: "#898989",
    height: 50,
    width: 300,
    borderRadius: 100,
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  controlPad: {
    borderWidth: 1,
    borderColor: "white",
    width: windowWidth - 20,
    height: 100,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  separator: {
    height: 30,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginHorizontal: 10,
  },
  currentStroke: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
  },
  strokeToolbar: {
    position: "absolute",
    top: 70,
    justifyContent: "space-between",
    zIndex: 100,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});
