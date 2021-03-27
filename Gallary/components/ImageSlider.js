import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { styles } from "../style";
import { Feather } from "@expo/vector-icons";
import { SimpleAnimation } from "react-native-simple-animations";

const ImageSlider = ({
  isVisible,
  hideModal,
  handleSingleDelete,
  handleSingleShare,
  images = [],
  selectedIndex = 0,
}) => {
  const [imgs, setimgs] = useState([]);
  const [showStatusBar, setshowStatusBar] = useState(true);
  const [currentIndex, setcurrentIndex] = useState(selectedIndex);
  useEffect(() => {
    if (images.length) {
      let newImgs = images.map((item) => {
        return {
          url: item.image,
        };
      });
      setimgs(newImgs);
    }
    setcurrentIndex(selectedIndex);
  }, [images, selectedIndex]);

  const onHideModal = () => {
    setshowStatusBar(true);
    hideModal();
  };

  const StatusBarImage = () => {
    return (
      <View style={styles.sliderStatusBar}>
        <TouchableOpacity
          onPress={() => {
            onHideModal();
          }}
        >
          <Feather
            name="arrow-left"
            size={25}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleSingleDelete(currentIndex)}
          >
            <Feather
              name="trash"
              size={26}
              color="silver"
              style={styles.statusBarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleSingleShare(currentIndex)}
          >
            <Feather
              name="share"
              size={26}
              color="silver"
              style={styles.statusBarIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          onHideModal();
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalView}
            onPress={() => {
              setshowStatusBar(!showStatusBar);
            }}
          >
            {showStatusBar && (
              <SimpleAnimation
                delay={500}
                duration={1000}
                fade
                direction="down"
                style={styles.statusBarContainer}
              >
                <StatusBarImage />
              </SimpleAnimation>
            )}
            {imgs.length > 0 && (
              <ImageViewer
                index={currentIndex}
                renderIndicator={() => {}}
                onClick={() => {
                  setshowStatusBar(!showStatusBar);
                }}
                loadingRender={() => (
                  <ActivityIndicator
                    color={"#FFA800"}
                    size="large"
                    style={{
                      height: Dimensions.get("window").height,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )}
                imageUrls={imgs}
                saveToLocalByLongPress={false}
                onChange={(index) => setcurrentIndex(index)}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImageSlider;
