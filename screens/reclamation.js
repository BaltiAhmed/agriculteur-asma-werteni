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
import { Textarea } from "native-base";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import { Authcontext } from "../context/auth-context";

const Reclamation = (props) => {
  const [sujet, setSujet] = useState();

  const auth = useContext(Authcontext);

  const submit = async () => {
    let response = await fetch(
      "http://192.168.1.185:5000/api/reclamation/ajoutreclamation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sujet: sujet,
          IdAgriculteur:auth.userId
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    Alert.alert(
      "Message",
      "votre demande est enregistrer, vous recevez une réponce bientot",
      [{ text: "fermer" }]
    );
  };

  return (
    <View>
      <ScrollView>
        <View style={{ marginRight: 20 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "10%" }}>
            مطلب:
            </Text>

            <Textarea
              rowSpan={5}
              bordered
              placeholder="مطلب"
              value={sujet}
              onChangeText={(text) => {
                setSujet(text);
              }}
            />
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

export default Reclamation;
