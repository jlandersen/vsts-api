"use strict";

import {VstsClient, VstsConfiguration} from "../src/index";


let configuration = new VstsConfiguration("https://nocture.visualstudio.com/DefaultCollection", "", "");
let client = new VstsClient(configuration);

client.build.getDefinitions("");