import json from './mimetypes.json' with { type: 'json' };

const MIME_TYPES = [...json];

const DEFAULT_MIME_TYPE = 'application/octet-stream';

const MIME_TYPES_ERROR_MESSAGES = {
    FILE_NAME_NOT_VALID: 'MimeTypes: The name of the file is not valid.',
    FILE_NOT_EXISTS: 'MimeTypes: File does not exists',
    UNKNOWN_CONTENT_TYPE: 'MimeTypes: Unknown content type',
    DIFFERENT_MAGIC_NUMBERS: 'MimeTypes: Different Magic Numbers'
};

export default MIME_TYPES;
export { MIME_TYPES_ERROR_MESSAGES, DEFAULT_MIME_TYPE };
