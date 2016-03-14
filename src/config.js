import fs from 'fs';

// @todo its a shameless plug. Find another way to store YOUTUBE_API when
// running locally
let dotEnvVars = null;

function getVars() {
  return fs.readFileSync('.env')
    .toString()
    .split("\n")
    .reduce((p, str) => {
      const [key, val] = str.split('=');
      if (key) {
        p[key] = val;
      }

      return p;
    }, {});
}

function resolveVar(varName) {
  if (process.env[varName]) {
    return process.env[varName];
  }

  if (!dotEnvVars) {
    dotEnvVars = getVars();
  }

  return dotEnvVars[varName] || null;
}

export const MONGO_URI = resolveVar('MONGO_URI');
export const MONGO_URI_TEST = resolveVar('MONGO_URI_TEST');
export const YOUTUBE_KEY = resolveVar('YOUTUBE_KEY');
export const ANALYTICS_ID = resolveVar('ANALYTICS_ID');
