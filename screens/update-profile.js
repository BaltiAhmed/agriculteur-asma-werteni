import React, { useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Card from "../components/Card";
import { Spinner } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Authcontext} from '../context/auth-context'


const UpdateProfile = (props) => {
  const [email, setEmail] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [datenaissa, setDatenaissa] = useState();
  const [password, setPassword] = useState();
  const [telephone, setTelephone] = useState();
  const [adresse, setAdresse] = useState();
  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDatenaissa(date.toString());
    hideDatePicker();
  };

  const auth = useContext(Authcontext)

  const submit = async () => {
    setLoading(true);
    let response = await fetch(
      `http://192.168.1.185:5000/api/agriculteur/${auth.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: email,
          password: password,
          datenaissa: datenaissa,
          telephone: telephone,
          adresse: adresse,
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    setLoading(false);
    Alert.alert("Message", "Votre compte est crée", [{ text: "fermer" }]);
  };

  return (
    <View style={{width:'90%',marginLeft:'5%'}}>
      {loading && <Spinner />}
      <ScrollView>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={(text) => {
              setNom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="nom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={(text) => {
              setPrenom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="prenom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Date de naissance</Text>
          <Button
            color="#b3e5fc"
            title="Date de naissance"
            onPress={showDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {datenaissa && <Text style={styles.label}>{datenaissa}</Text>}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Tel</Text>
          <TextInput
            style={styles.input}
            value={telephone}
            onChangeText={(text) => {
              setTelephone(text);
            }}
            keyboardAppearance="light"
            keyboardType="numeric"
            autoCapitalize="none"
            placeholder="Tel"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            value={adresse}
            onChangeText={(text) => {
              setAdresse(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="date de naissance"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="password"
            placeholderTextColor="dark"
            passwordRules
            label="password"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Valider" color="#0086c3" onPress={submit} />
        </View>
      </ScrollView>
    </View>
  );
};

UpdateProfile.navigationOptions = {
  headerTitle: "Mise à jour profile",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 700,
    padding: 20,
    marginLeft: "10%",
    marginTop: "10%",
  },
  buttonContainer: {
    marginTop: 20,
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
});

export default UpdateProfile;
