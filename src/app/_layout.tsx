import {  Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../providers/auth-provider";
import { useEffect, useState } from "react";
import SplashScreen from "./splash";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      setLoading(false);
    };

    loadApp();
  }, []);

  const handleAnimationFinish = () => {
    setAnimationFinished(true);
  };

  if (loading || !animationFinished) {
    return <SplashScreen onAnimationFinish={handleAnimationFinish} />;
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(shop)"
            options={{ headerShown: false, title: "Home" }}
          
          />
          <Stack.Screen
            name="league"
            options={{ headerShown: false, title: "League" }}
          />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}
