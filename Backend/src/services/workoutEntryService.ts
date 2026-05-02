import { supabase } from "../supabaseClient";

export const getPRsByUser = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_prs", {
    user_id_input: Number(userId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const getWorkoutEntriesByExercise = async (
  userId: string,
  exerciseId: string | string[],
) => {
  const { data, error } = await supabase.rpc("get_entries_by_exercise", {
    user_id_input: Number(userId),
    exercise_id_input: Number(exerciseId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data || {};
};

export const createWorkoutEntry = async (
  user_id: string,
  exercise_id: number,
  weight: number,
  reps: number,
  sets: number,
  created_at: string,
) => {
  const { data, error } = await supabase
    .from("workoutEntries")
    .insert([
      {
        user_id: user_id,
        exercise_id,
        weight,
        reps,
        sets,
        created_at: created_at || new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateWorkoutEntry = async (
  id: string,
  weight: number,
  reps: number,
  sets: number,
  created_at: string,
) => {
  const { data, error } = await supabase
    .from("workoutEntries")
    .update({
      weight: weight,
      sets: sets,
      reps: reps,
      created_at: created_at,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteWorkoutEntry = async (id: string) => {
  const { data, error } = await supabase
    .from("workoutEntries")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
