import fs from 'fs';

// @todo its a shameless plug. Find another way to store YOUTUBE_API when
// running locally
const dotEnvVars = fs.readFileSync('.env')
  .toString()
  .split("\n")
  .reduce((p, str) => {
    const [key, val] = str.split('=');
    if (key) {
      p[key] = val;
    }

    return p;
  }, {});

function resolveVar(varName) {
  return process.env[varName] || dotEnvVars[varName];
}

export const MONGO_URI = resolveVar('MONGO_URI');
export const MONGO_URI_TEST = resolveVar('MONGO_URI_TEST');
export const YOUTUBE_KEY = resolveVar('YOUTUBE_KEY');
