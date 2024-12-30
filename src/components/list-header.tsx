import { Link } from "expo-router";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-provider";
import { useEffect, useRef, useState } from "react";

export const ListHeader = () => {
  const data = [
    {
      id: 1,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-01.jpg"),
    },
    {
      id: 2,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-02.jpeg"),
    },
    {
      id: 3,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-03.jpg"),
    },
    {
      id: 4,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-04.jpeg"),
    },
    {
      id: 5,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-05.png"),
    },
    {
      id: 6,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-06.jpeg"),
    },
    {
      id: 7,
      slideImageUrl: require("../../assets/sliderImages/sportsSlideImage-07.jpeg"),
    },
  ];

  const carouselRef = useRef<FlatList<{
    id: number;
    slideImageUrl: any;
  }> | null>(null);

  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      console.log(changed);
      setActiveIndex(changed[0].index);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (activeIndex + 1) % data.length;
        carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  });

  const { email } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserName = (email: string | null) => {
    if (!email) return "Guest";
    return email.split("@")[0];
  };

  const userName = getUserName(email);

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello {userName}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <FontAwesome name="sign-out" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.heroContainer]}>
        {/* <Image
          source={require("../../assets/images/hero.png")}
          style={styles.heroImage}
        /> */}
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item, index }) => {
            return (
              <ImageBackground
                source={item.slideImageUrl}
                style={styles.heroImageDimension}
                imageStyle={styles.heroImage}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
          ref={(ref) => (carouselRef.current = ref)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
        />
      </View>
      <View style={styles.dotContainer}>
        {data.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * 375, index * 375, (index + 1) * 375],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });
          return (
            // <View
            //   key={index}
            //   style={[
            //     activeIndex === index ? styles.selectedDot : styles.dot,
            //     { opacity: index === activeIndex ? 1 : 0.5 },
            //   ]}
            // ></View>
            <Animated.View
              key={index}
              style={[
                index === activeIndex ? styles.selectedDot : styles.dot,
                { opacity },
              ]}
            />
          );
        })}
      </View>
      <View style={[styles.matchesContainer]}>
        <Text style={styles.sectionTitle}>Matches</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
    flex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
    flex: 1,
  },
  heroImageDimension: {
    width: Dimensions.get("window").width - 20,
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.11)",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    margin: 5,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  selectedDot: {
    width: 30,
    height: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "rgba(2, 0, 48, 0.72)",
  },
  matchesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
