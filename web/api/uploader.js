import cloudinary from 'cloudinary';
import util from 'util';
import fileUpload from 'express-fileupload';
import path from 'path';

export default async function handler(req, res) {
  await util.promisify(fileUpload({useTempFiles: true}))(req, res);
  const {body, files } = req; 
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const image = files.file;

  const upload = await cloudinary.v2.uploader.upload(
   image.tempFilePath,
    { context: {custom: {caption: body.caption, alt: body.alt}}, tags: body.tags, public_id: path.parse(image.name).name },
    function (error, result) {
      console.log('e',error,'r', result);
      return result;
    },
  );
  res.status(200).send(upload);
};
