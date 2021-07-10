import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Picker,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button } from "native-base";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconEntypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";

const Landing = (props) => {
  const [image, setImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const img = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(img);
    console.log(image.uri);
    props.onImageTaken(img.uri);
  };

  const takeImageCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const img = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(img);
    console.log(image.uri);
    props.onImageTaken(img.uri);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.imagePicker}>
          <View style={styles.imagePreview}>
            {!image ? (
              <Text>Choisir une image</Text>
            ) : (
              <Image style={styles.image} source={{ uri: image.uri }} />
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <IconEntypo
              name="image"
              size={25}
              color="blue"
              onPress={takeImage}
              style={{ padding: 20 }}
            />
            <IconEntypo
              name="camera"
              size={25}
              color="blue"
              onPress={takeImageCamera}
              style={{ padding: 20 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

Landing.navigationOptions = {
  headerTitle: "Envoie demande de diagnostique",
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Landing;
