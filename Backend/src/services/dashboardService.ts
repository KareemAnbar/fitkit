import { supabase } from "../supabaseClient";

export const getDashboardStats = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_dashboard_stats", {
    p_user_id: Number(userId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data || {};
};
