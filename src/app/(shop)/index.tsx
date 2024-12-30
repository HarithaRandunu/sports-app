import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { getLeagues } from "../../api/api";
import { LeagueListItem } from "../../components/league-list-item";
import { ListHeader } from "../../components/list-header";
import { LeagueCartDetails } from "../../models/league";
import { create } from "zustand";

interface StoreState {
  count: number;
  incrementCount: () => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const { count, incrementCount } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeagues()
      .then((data) => {
        setLeagues(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={leagues}
        renderItem={({ item }) => (
          <LeagueListItem league={item} onIncrement={incrementCount} />
        )}
        keyExtractor={(item: LeagueCartDetails) => item.idLeague}
        numColumns={1}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
        key={1} // Change the key prop to force a fresh render
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={incrementCount}
        disabled={true}
      >
        <Text style={styles.buttonText}>Clicked: {count}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
