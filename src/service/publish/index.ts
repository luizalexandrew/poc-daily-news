import { PostToInstaImage, PostToInstaStory } from "./instagram";

const PublishPlatforms = {
  instagram: {
    story: PostToInstaStory,
    post: PostToInstaImage,
  },
};

export const Publish = async (platform: string, type: string, path: string) => {
  if (PublishPlatforms[platform] && PublishPlatforms[platform][type]) {
    const publishReponse = await PublishPlatforms[platform][type](path, false);

    return {
      isError: publishReponse.isError,
      message: publishReponse.message,
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
