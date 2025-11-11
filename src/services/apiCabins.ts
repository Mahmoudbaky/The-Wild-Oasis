import supabase from "./supabase";

const cabinServices = {
  getCabins: async () => {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
    return data;
  },
  //   async createCabin(newCabin) {
  //     const { data, error } = await supabase.from("cabins").insert(newCabin);
  //     if (error) {
  //       console.error(error);
  //       throw new Error("Cabin could not be created");
  //     }
  //     return data;
  //   },
};

export default cabinServices;
