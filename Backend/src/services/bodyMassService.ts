import { supabase } from "../supabaseClient";

export const getAllBodyMassByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("bodyMass")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getLatestBodyMassByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("bodyMass")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createBodyMass = async (
  user_id: string,
  body_mass: number,
  body_fat: number,
  created_at: string,
) => {
  const { data, error } = await supabase.from("bodyMass").insert({
    user_id: user_id,
    body_mass: body_mass,
    body_fat: body_fat,
    created_at: created_at,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateBodyMass = async (
  id: string,
  body_mass: number,
  body_fat: number,
  created_at: string,
) => {
  const { data, error } = await supabase
    .from("bodyMass")
    .update({
      body_mass: body_mass,
      body_fat: body_fat,
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
export const deleteBodyMassById = async (id: string) => {
  const { data, error } = await supabase.from("bodyMass").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
