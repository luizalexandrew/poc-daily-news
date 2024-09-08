export const Clamp = (value: number, min: number, max: number) =>
  Math.max(Math.min(value, max), min);

export const GenerateUsertagFromName = async (
  name: string,
  x: number,
  y: number,
  ig: any
): Promise<{ user_id: number; position: [number, number] }> =>{
  // constrain x and y to 0..1 (0 and 1 are not supported)
  x = Clamp(x, 0.0001, 0.9999);
  y = Clamp(y, 0.0001, 0.9999);
  // get the user_id (pk) for the name
  const { pk } = await ig.user.searchExact(name);
  return {
    user_id: pk,
    position: [x, y],
  };
}

export default {
    GenerateUsertagFromName,
    Clamp
}