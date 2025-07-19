# File Mime Type
Get or check a file mime Type

## Features

- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Issue Templates](https://github.com/ryansonshine/typescript-npm-package-template/tree/main/.github/ISSUE_TEMPLATE)
- 
## Install

With **npm**:

```bash
npm install get-file-mime-type
```

## Usage

```ts
// Import the package
import { getFileMimeType } from 'get-file-mime-type';

// Get the mime type from a given fileº
getNodePackagesInstalledVersion(filename);
```

## API

### getFileMimeType(filename)

#### filename

Type: `string`

This is the the route to the file that we want to get the mime type

Then, it will returns:

```typescript
type FileMimeType = {
  mimetype: string; // File mime type
  signature: string; // File signature
  safeCheck: boolean; // Wheter the file has been checked using Magic Numbers - If the file does not have Magic Numbers 'safeCheck' will be 'false'
};
```
