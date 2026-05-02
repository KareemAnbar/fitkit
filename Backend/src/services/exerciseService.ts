import { supabase } from "../supabaseClient";

export const getExerciseCatalog = async () => {
  const { data, error } = await supabase.rpc("get_exercise_catalog");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
