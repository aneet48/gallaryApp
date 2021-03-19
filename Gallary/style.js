import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const gridWidth = width / 2 - 20;

export const styles = StyleSheet.create({
  // general
  flexOne:{
    flex:1
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  // status bar
  statusBar: {
    paddingHorizontal: 15,
    paddingTop:30,
    paddingBottom: 15,
    backgroundColor: "black",
  },
  statusBarIcon: {
    marginLeft: 10,
  },
  statusBarTitle: {
    fontSize: 20,
    color: "silver",
  },

  //   gallary
  gallaryContainer: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "#393939",
  },
  gallaryColumnContainer: {
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  gallaryImgContainer: {
    borderRadius: 10,
    position: "relative",
  },
  gallaryImg: {
    width: gridWidth,
    height: gridWidth,
    borderRadius: 5,
  },
  emptyGallaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  emptyGallaryMsg: {
    color: "gray",
    fontSize: 20,
    textAlign: "center",
  },
  imageAction: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 5,
  },
  radio: {
    backgroundColor: "rgba(220, 220, 220 ,0.6)",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    width: 18,
    height: 18,
  },
  selected: {
    position: "absolute",
    top: "-20%",
    right: "-5%",
  },
  //imagemodal
  modalContainer: {
    flex: 1,
  },
  modalView: {
    height: "100%",
    backgroundColor: "white",
  },
});
