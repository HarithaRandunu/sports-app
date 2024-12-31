import { Animated, FlatList, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { LeagueCartDetails } from "../models/league";

interface LeagueListItemProps {
  league: LeagueCartDetails;
  onIncrement: () => void;
}

export const getImageUrl = (sport: string): string => {
  const sportImages: { [key: string]: string } = {
    "Soccer": require("../../assets/sportsImages/soccerImage.jpg"),
    Basketball: require("../../assets/sportsImages/basketballImage.webp"),
    Motorsport: require("../../assets/sportsImages/motorsportImage.jpg"),
    "American Football": require("../../assets/sportsImages/americanFootballImage.jpg"),
    "Ice Hockey": require("../../assets/sportsImages/iceHockeyImage.jpg"),
    // Add more sports and their corresponding image URLs
  };

  return sportImages[sport] || require("../../assets/sportsImages/defualtImage.jpg");
};

export const getIconUrl = (sport: string): string => {
  const iconImages: { [key: string]: string } = {
    "Soccer": require("../../assets/sportsIconImages/soccerIcon.png"),
    Basketball: require("../../assets/sportsIconImages/basketballIcon.png"),
    Motorsport: require("../../assets/sportsIconImages/motorsportIcon.jpg"),
    "American Football": require("../../assets/sportsIconImages/americanFootballIcon.png"),
    "Ice Hockey": require("../../assets/sportsIconImages/iceHockeyIcon.jpg"),
    // Add more sports and their corresponding image URLs
  };

  return iconImages[sport] || require("../../assets/sportsIconImages/defaultIcon.png");
}



export const LeagueListItem: React.FC<LeagueListItemProps> = ({ league, onIncrement, }) => {


  const imageUrl: string = getImageUrl(league.strSport);
  const iconUrl: string = getIconUrl(league.strSport);

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed); // Toggle the pressed state
    onIncrement(); // Trigger the increment callback
  };

  return (
    <View style={styles.list}>
      {/* <Link asChild href={`/league/${league.idLeague}`}> */}
        <Pressable style={[styles.item, isPressed && styles.itemPressed, ]} onPress={handlePress}>
          <View style={styles.itemImageContent}>
            <Image source={imageUrl} style={styles.itemImage} />
          </View>
          <View style={styles.thumbImageContent}>
            <Image source={iconUrl} style={styles.thumbImage} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.strLeague}>{league.strLeague}</Text>
            <Text style={styles.strLeagueAlt}>{league.strLeagueAlternate}</Text>
            <Text>{league.strSport}</Text>
          </View>
        </Pressable>
      {/* </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  item: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemPressed: {
    backgroundColor: "#f0f0f0", // Change background on press
    borderColor: "rgba(4, 0, 124, 0.75)", // Highlight border
    borderWidth: 2,
  },
  itemImageContent: {
    borderRadius: 10,
    width: "100%",
    height: 80,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbImageContent: {
    borderRadius: 50,
    width: 80,
    height: 80,
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "rgba(0,0,0,1)",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "cover",
  },
  itemTextContainer: {
    padding: 10,
    marginRight: 10,
    alignItems: "flex-end",
    gap: 4,
  },
  strLeague: {
    fontSize: 18,
    color: "rgba(4, 0, 124, 0.75)",
    fontWeight: "bold",
  },
  strLeagueAlt: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
