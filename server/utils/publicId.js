function extractPublicId(obj) {
  const publicId = obj.profile_image.split("/").reverse()[0].split(".")[0];
  return publicId;
}

module.exports = { extractPublicId };
