import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          console.log("Animation Finished!");
          onAnimationFinish();
        }}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;