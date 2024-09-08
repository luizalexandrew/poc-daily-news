import { PostToInstaImage, PostToInstaStory } from "./instagram";
import { ProcessProps } from "../../types/Process";

const PublishPlatforms = {
  instagram: {
    story: PostToInstaStory,
    post: PostToInstaImage,
  },
};

export const Publish = async (platform: string, type: string, path: string): Promise<ProcessProps> => {
  if (PublishPlatforms[platform] && PublishPlatforms[platform][type]) {
    const publishResponse = await PublishPlatforms[platform][type](path, false);

    return {
      isError: publishResponse.isError,
      message: publishResponse.message,
    };
  } else {
    return {
      isError: true,
      message: "Platform not implemented",
    };
  }
};

export default {
  Publish,
};
