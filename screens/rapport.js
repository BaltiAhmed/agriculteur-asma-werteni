import React, { useEffect, useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Button,
} from "react-native";
import { Card, CardItem, Body } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Rapport = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/reponce/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.reponce);
      setIdReponce(responseData.id);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);
  const [idReponce, setIdReponce] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/reponce/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.reponce);
      setIdReponce(responseData.id);
    };
    sendRequest();
  }, []);

  console.log(list)

  

  
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list &&
          list.map((row) => (
            <View>
              <Card>
                <CardItem header bordered>
                  <Text>{row.nom}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{row.description}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Text>{row.cause}</Text>
                </CardItem>
              </Card>
              <Button title="Afficher le traitement" onPress={() => {}} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

Rapport.navigationOptions = {
  headerTitle: "Rapport",
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: 265,
  },
});

export default Rapport;
