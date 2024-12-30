import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { LeagueCartDetails, LeaguesAll } from "../../models/league";
import { fetchAllLeagues } from "../../lib/supabase";

const LeagueDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const [league, setLeague] = useState<LeagueCartDetails>();
  
  useEffect(() => {
    const fetchLeagueDetails = async () => {
      const leagues = await fetchAllLeagues();
      const league = leagues.find((item) => item.idLeague === slug);
      setLeague(league);
    };

    if (slug) {
      fetchLeagueDetails();
    }
  }, [slug]);
  
  console.log(slug);
  console.log(league);
    
  if (!league) return <Redirect href="/404" />;

  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: league.strLeague }} />
      {/* <Image source={product.heroImage} style={styles.heroImage} /> */}
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>Title: {league.strLeague}</Text>
        <Text style={styles.slug}>Slug: {league.idLeague}</Text>
        {/* <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View> */}
        {/* <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageContainer}
        /> */}
      </View>
    </View>
  );
};

export default LeagueDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});
