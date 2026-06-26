#!/usr/bin/env node
import { Program } from "./index.js";

const program = new Program();
program.run().catch((error) => {
  console.error(error);
  process.exit(1);
});
