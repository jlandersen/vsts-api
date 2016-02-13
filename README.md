# vsts-api
[![Build Status](https://travis-ci.org/jlandersen/vsts-api.svg?branch=master)](https://travis-ci.org/jlandersen/vsts-api)

Visual Studio Team Services and TFS client library for Node.js, loosely based on [Infinity.NET][0].

[0]: https://github.com/ethomson/infinity.net

## Source
The project is built using TypeScript. You only need TypeScript installed (`npm install -g typescript`) to work with the source code.

To compile the project, simply run `npm run build`.


## Unit Tests
Unit tests are created using Jasmine.

To run the test suite, simply run `npm test`.

## Quick Start (TypeScript)
```typescript
import { VstsClient, VstsConfiguration } from "vsts-api";

let configuration = new VstsConfiguration("https://myaccount.visualstudio.com/DefaultCollection", "user", "password");
let client = VstsClient.createFromConfiguration(configuration);

// Lists name of all projects
client.project.getProjects().then(result => {
    for (let project of result) {
        console.log(project.name);
    }
});
```

## Quick Start (JavaScript)
```javascript
let vs = require("vsts-api");

let configuration = new vs.VstsConfiguration("https://myaccount.visualstudio.com/DefaultCollection", "user", "password");
let client = vs.VstsClient.createFromConfiguration(configuration);

client.project.getProjects().then(result => {
    for (let project of result) {
        console.log(project.name);
    }
});
```

## License
Copyright (c) Jeppe Andersen. All rights reserved.

Available under the MIT license (refer to the LICENSE file).
