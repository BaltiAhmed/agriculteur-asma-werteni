import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Landing from "../screens/landing";
import UpdateProfile from "../screens/update-profile";
import Reclamation from "../screens/reclamation";
import ListDemande from "../screens/liste-demande";
import DetailDemandeDiagnostique from "../screens/detail-demande-diagostique";
import Rapport from "../screens/rapport";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const ReclamationNav = createStackNavigator(
  {
    Reclamation: Reclamation,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const listDemandeNav = createStackNavigator(
  {
    ListReclamation: ListDemande,
    DetailDemandeDiagnostique:DetailDemandeDiagnostique,
    Rapport:Rapport
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const UpdateProfileNav = createStackNavigator(
  {
    UpdateProfile: UpdateProfile,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#9c27b0",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Acceuil: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Reclamation: {
      screen: ReclamationNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <MaterialIcons name="report-problem" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Mes_Reclamation: {
      screen: listDemandeNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <MaterialIcons name="report-problem" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Profile: {
      screen: UpdateProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontisto name="person" size={25} color="#fafafa" />;
        },
        tabBarColor: "#9c27b0",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
