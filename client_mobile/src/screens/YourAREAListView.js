import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, Color, FontSize } from "../../GlobalStyles";

export default function YourAreaListView({ navigation }) {

  return (
    <View style={styles.YourAreaListView}>
      <View style={[styles.ecran1, styles.ecran1Position]} />
      <Text style={[styles.trombinoscope, styles.trombinoscopeTypo]}>
        Your AREA
      </Text>
      <Image
        style={styles.back2Icon1}
        contentFit="cover"
        source={require("../../assets/back-button.png")}
      />
      <Text style={[styles.letOnlyThe1, styles.letOnlyThe1FlexBox]}>
        Let only the essential cross your sight.
      </Text>
      <Pressable
        style={styles.image9}
        onPress={() => navigation.navigate("YourArea")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../../assets/reddit.png")}
        />
      </Pressable>
      <Pressable
        style={styles.profile7}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../../assets/profile-small.png")}
        />
      </Pressable>
      <View style={styles.cloudy1Parent}>
        <Image
          style={[styles.cloudy1Icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../../assets/cloudy-icon.png")}
        />
        <Image
          style={[styles.image1Icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../../assets/add-icon.png")}
        />
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../../assets/reddit.png")}
        />
      </View>
      <Image
        style={styles.YourAreaListViewChild}
        contentFit="cover"
        source={require("../../assets/reddit.png")}
      />
      <LinearGradient
        style={styles.YourAreaListViewItem}
        locations={[0, 1]}
        colors={["rgba(24, 19, 41, 0)", "#181329"]}
      />
      <Pressable
        style={[styles.boutonAddArea1, styles.boutonLayout]}
        onPress={() => navigation.navigate("AddAREA")}
      >
        <View style={[styles.boutonAddAreaChild, styles.boutonLayout]} />
        <Text style={[styles.trombinoscope1, styles.letOnlyThe1FlexBox]}>
          <Text style={styles.trombinoscopeTxt}>
            <Text style={styles.add}>{`ADD `}</Text>
            <Text style={styles.area}>AREA</Text>
          </Text>
        </Text>
      </Pressable>
      <Image
        style={styles.logo2Icon}
        contentFit="cover"
        source={require("../../assets/logo-small.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ecran1Position: {
    top: 0,
    left: 0,
  },
  trombinoscopeTypo: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    fontWeight: "800",
  },
  letOnlyThe1FlexBox: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    position: "absolute",
  },
  iconLayout: {
    width: 50,
    height: 50,
    top: 0,
    position: "absolute",
  },
  boutonLayout: {
    height: 64,
    width: 151,
    position: "absolute",
  },
  ecran1: {
    right: 0,
    bottom: 0,
    borderRadius: Border.br_39xl,
    backgroundColor: Color.gray_200,
    left: 0,
    position: "absolute",
  },
  trombinoscope: {
    top: 132,
    fontSize: FontSize.size_11xl,
    letterSpacing: 0.6,
    textAlign: "left",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    color: Color.white,
    fontWeight: "800",
    left: 17,
    position: "absolute",
  },
  back2Icon1: {
    top: 61,
    width: 24,
    height: 24,
    left: 23,
    position: "absolute",
  },
  letOnlyThe1: {
    top: 168,
    fontSize: FontSize.size_xs,
    letterSpacing: 0.2,
    color: Color.palevioletred,
    width: 281,
    left: 17,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image9: {
    left: 342,
    top: 139,
    width: 48,
    height: 42,
    position: "absolute",
  },
  profile7: {
    left: 347,
    top: 51,
    width: 43,
    height: 43,
    position: "absolute",
  },
  cloudy1Icon1: {
    left: 94,
  },
  image1Icon1: {
    left: 0,
  },
  vectorIcon1: {
    height: "40%",
    width: "13.89%",
    top: "40%",
    right: "43.06%",
    bottom: "20%",
    left: "43.06%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  cloudy1Parent: {
    top: 209,
    left: 38,
    width: 144,
    height: 50,
    position: "absolute",
  },
  YourAreaListViewChild: {
    top: 208,
    width: 373,
    height: 564,
    left: 17,
    position: "absolute",
  },
  YourAreaListViewItem: {
    top: 533,
    left: 19,
    width: 371,
    height: 247,
    backgroundColor: "transparent",
    position: "absolute",
  },
  boutonAddAreaChild: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.palevioletred,
    borderStyle: "solid",
    borderColor: "#ad5379",
    borderWidth: 1,
    left: 0,
    top: 0,
  },
  add: {
    color: Color.white,
  },
  area: {
    color: Color.gray_100,
  },
  trombinoscopeTxt: {
    lineBreak: "anywhere",
    width: "100%",
  },
  trombinoscope1: {
    top: 15,
    fontSize: FontSize.size_xl,
    letterSpacing: 0.4,
    width: 128,
    height: 34,
    left: 23,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    fontWeight: "800",
    alignItems: "center",
    display: "flex",
  },
  boutonAddArea1: {
    top: 749,
    left: 239,
  },
  logo2Icon: {
    top: 36,
    left: 176,
    width: 76,
    height: 82,
    position: "absolute",
  },
  YourAreaListView: {
    flex: 1,
    height: 848,
    overflow: "hidden",
    width: "100%",
  },
});
