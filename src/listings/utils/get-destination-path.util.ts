// import e = require('express');

export const getDestinationPath = (
  // req: e.Request,
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, destination: string) => void,
) => {
  console.log(req.body.title);
  callback(null, '/images');
};
