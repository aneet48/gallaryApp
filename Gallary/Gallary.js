import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { styles } from "./style";
import { Feather } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import ImageSlider from "./components/ImageSlider";
import * as Permissions from "expo-permissions";



const GallaryComponent = () => {
  const [images, setimages] = useState([]);
  const [selectEnabled, setselectEnabled] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [openImageSlider, setopenImageSlider] = useState(false);
  const [permissionGranted, setpermissionGranted] = useState(null);
  const [camerapermissionGranted, setcamerapermissionGranted] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        askImagePickerPermission();
      }
    })();
  }, []);
  const askImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      setpermissionGranted(false);
    } else {
      setpermissionGranted(true);
    }

    const camerapermission = await Permissions.getAsync(Permissions.CAMERA);
    console.log("camerapermission", camerapermission);

    if (camerapermission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      console.log("newPermission", newPermission);

      if (newPermission.status === "granted") {
        setcamerapermissionGranted(true);
      }
    } else {
      setcamerapermissionGranted(true);
    }
  };

  const pickImage = async () => {
    if (!permissionGranted) {
      askImagePickerPermission();
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      addImage(result);
    }
  };

  const clickImage = async () => {
    if (!camerapermissionGranted) {
      askImagePickerPermission();
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      addImage(result);
    }
  };

  const addImage = (result) => {
    let id = images.length ? images[images.length - 1].id + 1 : 1;
    setimages([
      ...images,
      {
        id: id,
        selected: false,
        image: result.uri,
        url: result.uri,
      },
    ]);
  };

  const handleLongPress = (item) => {
    if (!selectEnabled) {
      setselectEnabled(true);
    }
  };
  const handleOnPress = (item,index) => {
    if (!selectEnabled) {
      setselectedIndex(index)
      setopenImageSlider(true);
      return;
    }
    let imgs = images.map((i) => {
      if (i.id == item.id) {
        i.selected = !i.selected;
      }
      return i;
    });
    setimages(imgs);
  };

  const handleMultiDelete = () => {
    let imgs = images.filter((i) => !i.selected);
    setimages(imgs);
  };
  const handleSingleDelete = (selectedIndex) => {
    let imgs = images.filter((i, index) => index !== selectedIndex);
    setimages(imgs);
  };

  const handleSingleShare = async (selectedIndex) => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    console.log(selectedIndex);
    await Sharing.shareAsync(images[selectedIndex].image);
  };
  const handleMultiShare = async () => {
    // if (!(await Sharing.isAvailableAsync())) {
    //   alert(`Uh oh, sharing isn't available on your platform`);
    //   return;
    // }
    // await Sharing.shareAsync([images[0].image]);
  };

  const handleDeselect = () => {
    let imgs = images.map((item) => {
      item.selected = false;
      return item;
    });
    setimages(imgs);
    setselectEnabled(false);
  };
  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  const renderItem = ({ item ,index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.gallaryImgContainer]}
        onLongPress={() => handleLongPress(item)}
        onPress={() => {
          handleOnPress(item,index);
        }}
      >
        <Image style={styles.gallaryImg} source={{ uri: item.image }} />
        {selectEnabled && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.imageAction}
            onPress={() => {
              handleOnPress(item);
            }}
          >
            <View style={styles.radio}></View>
            {item.selected && (
              <Feather
                name="check"
                size={20}
                color="black"
                style={styles.selected}
              />
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.flexOne]}>
      <View style={[styles.row, styles.spaceBetween, styles.statusBar]}>
        <Text style={[styles.bold, styles.statusBarTitle]}>Home</Text>
        {!selectEnabled && (
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.6} onPress={clickImage}>
              <Feather
                name="camera"
                size={26}
                color="silver"
                style={styles.statusBarIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
              <Feather
                name="plus"
                size={26}
                color="silver"
                style={styles.statusBarIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        {selectEnabled && (
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleMultiDelete}>
              <Feather
                name="trash"
                size={26}
                color="silver"
                style={styles.statusBarIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={handleMultiShare}>
              <Feather
                name="share"
                size={26}
                color="silver"
                style={styles.statusBarIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableWithoutFeedback onPress={handleDeselect}>
        <View style={styles.gallaryContainer}>
          {images.length > 0 && (
            <FlatList
              columnWrapperStyle={styles.gallaryColumnContainer}
              numColumns={2}
              data={images}
              renderItem={renderItem}
              key={2}
              keyExtractor={(item, index) => `image${item.id}`}
            />
          )}
          {!images.length && (
            <View style={styles.emptyGallaryContainer}>
              <Text style={styles.emptyGallaryMsg}>
                Add image from gallary or by using camera.
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {openImageSlider && images.length > 0 && (
        <ImageSlider
          isVisible={openImageSlider}
          hideModal={() => setopenImageSlider(false)}
          handleSingleDelete={handleSingleDelete}
          handleSingleShare={handleSingleShare}
          images={images}
          selectedIndex={selectedIndex}
        />
      )}
    </SafeAreaView>
  );
};

export default GallaryComponent;
