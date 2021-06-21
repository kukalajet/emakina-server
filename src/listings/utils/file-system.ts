import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';

function getExtension(filename: string) {
  var i = filename.lastIndexOf('.');
  return i < 0 ? '' : filename.substr(i + 1);
}

function writeFile(
  folder: string,
  filename: string,
  extension: string,
  // dumb typing because of a possible TS bug:
  // In `Buffer | DataView | NodeJS.TypedArray`, `NodeJS.TypedArray` is not detected.
  buffer: fs.BinaryData | any,
) {
  const path = `./${folder}`;
  const file = `${path}/${filename}.${extension}`;

  console.log(`file: ${file}`);

  fs.mkdir(path, { recursive: true }, function(err) {
    if (err) throw new InternalServerErrorException(err);
    fs.open(file, 'w', function(err, fd) {
      if (err) throw new InternalServerErrorException(err);
      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw new InternalServerErrorException(err);
        fs.close(fd, function() {
          console.log(`Wrote file successfully at file: ${file}`);
        });
      });
    });
  });
}

export { writeFile, getExtension };
