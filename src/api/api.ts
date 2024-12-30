import { LeagueCartDetails } from './../models/league';
import { fetchAllLeagues } from '../lib/supabase';

export const getLeagues = async () => {
  try {
    const leagues = await fetchAllLeagues();
    return leagues;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    throw error;
  }
};

