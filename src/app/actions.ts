"use server";

import { neon } from "@neondatabase/serverless";

// Connect to the Neon database
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getCount() {
  try {
    const result = await sql("SELECT count FROM counter LIMIT 1");
    return result[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching count:", error);
    return 0;
  }
}

export async function incrementCount() {
  try {
    // Increment the count in the 'counter' table
    await sql("UPDATE counter SET count = count + 1"); // Increment the count
    return await getCount(); // Return the new count after incrementing
  } catch (error) {
    console.error("Error incrementing count:", error);
    throw new Error("Could not increment count"); // Handle error as needed
  }
}
