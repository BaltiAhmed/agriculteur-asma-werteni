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
import Form1 from '../components/form1'
import Form2 from '../components/form2'
import Form3 from '../components/form3'


const Landing = (props) => {
  const [selectedValue, setSelectedValue] = useState("القمح");
  
  return (
    <View>
      <ScrollView>
      <Text style={{fontSize:20,marginLeft:'20%',marginTop:10}}>Choisir une plante</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 60, width: 250, marginLeft:'20%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="القمح" value="القمح" />
        <Picker.Item label="الشعير" value="الشعير" />
        <Picker.Item label="الفول" value="الفول" />
      </Picker>
      {selectedValue === "القمح" && <Form1/> }
      {selectedValue === "الشعير" && <Form2/> }
      {selectedValue === "الفول" && <Form3/> }
      
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
