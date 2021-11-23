import cloudinary from 'cloudinary';

export async function handler(event, context) {
  cloudinary.config({
    cloud_name: 'pots',
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
  return {
    statusCode: 200,
    body: JSON.stringify(resources),
  };
}
