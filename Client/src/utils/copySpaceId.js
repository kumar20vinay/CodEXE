export const copySpaceId = (spaceId) => {
  navigator.clipboard.writeText(spaceId);

  return {
    status: true,
    message: { title: "SessionId copied to clipboard." },
  };
};
