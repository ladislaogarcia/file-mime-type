import { extname } from 'node:path';
import {statSync, openSync, readSync, closeSync} from 'node:fs';
import mimetypes from './mimetypes.json' with { type: 'json' }
import magicnumbers from './magicnumbers.json' with {type: 'json'}

const FILE_SIGNATURE_LONG = 9;
const DEFAULT_MIME_TYPE = 'application/octet-stream';
const SIGNATURE_DEFAULT = '';

const fileExists = (filename?: string) => {
  if(!filename) { return false; }
  try {
    statSync(filename);
    return true;
  } catch (e) {
    return false;
  }
}

const getMagicNumbersFromFile = (filename: string) => {
  try {
    const fileDescriptor = openSync(filename, 'r');
    const buffer = Buffer.alloc(FILE_SIGNATURE_LONG);
    closeSync(fileDescriptor);
    return buffer.toString('hex').toUpperCase();
  } catch(e) {
    throw e;
  }
}

const hasMagicNumbers = (filename: string): boolean => {
  const ext = extname(filename);
  return magicnumbers.some(node => node.extensions.includes(ext));
}

const getFileMimeTypeByFileExtension = (filename: string) => {
  const ext = extname(filename);
  return mimetypes.find(node => node.extensions.includes(ext))?.mimetype;
}

export const getFileMimeType = (
  filename?: string,
): {
  mime: string;
  signature: string | boolean;
  safeCheck: boolean;
} => {
  if (!filename) {
    throw 'FILENAME IS REQUIRED';
  }
  if (!fileExists(filename)) {
    throw 'FILENAME OF AN EXISTING FILE IS REQUIRED';
  }
  const mime = getFileMimeTypeByFileExtension(filename) ?? DEFAULT_MIME_TYPE;
  let signature: string = SIGNATURE_DEFAULT;
  if (hasMagicNumbers(filename)) {
    const signatureFile = getMagicNumbersFromFile(filename);
    signature =
      magicnumbers.find((item) => {
        const itemSign = item.signature.split(' ').join('');
        return signatureFile === itemSign || signatureFile.startsWith(itemSign);
      })?.signature ?? SIGNATURE_DEFAULT;
  }
  return {
    mime,
    signature,
    safeCheck: !!signature,
  };
};
