# lockwright-lib-data-import

A utility for importing data from various password managers into a vault.

Site: [lockwright.dexterity.works](https://lockwright.dexterity.works)

Community fork of PearPass (Apache 2.0). Not affiliated with or endorsed by Tether Data or the Pears project.

## Features

This library provides functions to parse exported data from the following password managers:

*   1Password
*   Bitwarden
*   LastPass
*   NordPass
*   PearPass
*   ProtonPass

## Installation

Install the package using npm:

```bash
npm install git+https://github.com/Dexterity-Works/lockwright-lib-data-import.git
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Usage Examples

Here is an example of how to use the library to parse data from a 1Password export file:

```javascript
import { parse1PasswordData } from 'lockwright-lib-data-import';
import fs from 'fs';

const filePath = 'path/to/your/1password_export.csv';
const fileContent = fs.readFileSync(filePath, 'utf-8');

try {
  const parsedData = parse1PasswordData(fileContent);
  console.log(parsedData);
} catch (error) {
  console.error('Error parsing data:', error);
}
```

## Dependencies

This project has no production dependencies. Development dependencies are listed in `package.json`.

## Related Projects

*   [lockwright-lib-data-export](https://github.com/Dexterity-Works/lockwright-lib-data-export)

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.
