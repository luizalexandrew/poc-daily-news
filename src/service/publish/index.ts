import { PostToInstaImage, PostToInstaStory } from "./instagram";
import { ProcessProps } from "../../types/Process";

const PublishPlatforms = {
  instagram: {
    story: PostToInstaStory,
    post: PostToInstaImage,
  },
};

export const Publish = async (platform: string, type: string, path: string): Promise<ProcessProps> => {

  console.log("[INFO: ]",platform, type, path)

  if (PublishPlatforms[platform] && PublishPlatforms[platform][type]) {
    const publishResponse = await PublishPlatforms[platform][type](path);

    return {
      isSuccess: publishResponse.isSuccess,
      message: publishResponse.message,
    };
  } else {
    return {
      isSuccess: true,
      message: "Platform not implemented",
    };
  }
};

export default {
  Publish,
};
