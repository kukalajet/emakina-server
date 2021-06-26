export const getImageFileFilter = (
  _: Request,
  file: Express.Multer.File,
  // file: any,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    callback(new Error('Only image files are allowed'), false);
    return;
  }

  callback(null, true);
};
