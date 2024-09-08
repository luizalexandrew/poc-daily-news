import GoogleImages from "google-images";

const client = new GoogleImages(
  process.env.CSE_ID_GOOGLE,
  process.env.API_KEY_GOOGLE
);

export const findImage = async (search: string) => {
  const images = await client.search(search, { safe: "off", size: "large" });
  return images[0].url;
};
