import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Picker,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  CheckBox,
  Button,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import { Authcontext } from "../context/auth-context";

const Form3 = (props) => {
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

  const [couleur, setCouleur] = useState("أصفر");
  const [sympthome, setSympthome] = useState("على الأزهار و القورون");

  const auth = useContext(Authcontext);

  const submit = async () => {
    const url = "http://192.168.1.185:5000/api/demande/ajout";
    const fileUri = image.uri;
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("type", "الفول");
    formData.append("couleur", couleur);
    formData.append("sympthome", sympthome);
    formData.append("agriculteurID", auth.userId);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    let response = await fetch(url, options);

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
    Alert.alert("Message", "Votre demande est enregistré", [
      { text: "fermer" },
    ]);
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
        <View style={{ marginRight: 20 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
              ماهو لون الورقة أو السنبلة:
            </Text>

            <Picker
              selectedValue={couleur}
              style={{ height: 60, width: 250, marginLeft: "20%" }}
              onValueChange={(itemValue, itemIndex) => setCouleur(itemValue)}
            >
              <Picker.Item label="أصفر" value="أصفر" />
              <Picker.Item label="حمراء" value="حمراء" />
              <Picker.Item label="بنية" value="بنية" />
              <Picker.Item label="بيضاء إلي بني" value="بيضاء إلي بني" />
            </Picker>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
              كيف تكون الأعراض على الورقة :
            </Text>

            <Picker
              selectedValue={sympthome}
              style={{ height: 60, width: 250, marginLeft: "20%" }}
              onValueChange={(itemValue, itemIndex) => setSympthome(itemValue)}
            >
              <Picker.Item
                label="على الأزهار و القورون"
                value="على الأزهار و القورون"
              />
              <Picker.Item
                label=" على ساق  الورقة "
                value=" على ساق  الورقة "
              />
              <Picker.Item
                label=" على سطحى الورقة "
                value=" على سطحى الورقة "
              />
              <Picker.Item
                label="  ذبول شديد للورقة "
                value="  ذبول شديد للورقة "
              />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Valider"
            color="#0086c3"
            onPress={() => {
              submit();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
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
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default Form3;
