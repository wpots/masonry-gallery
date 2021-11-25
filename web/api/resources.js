import cloudinary from 'cloudinary';

module.exports = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const resources = await cloudinary.v2.api.resources(
    { tags: true, context: true, max_results: 12 },
    function (error, result) {
      console.log(result);
      return result;
    },
  );
  res.status(200).send(resources);
};
