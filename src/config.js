const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromCRA = process.env.REACT_APP_ENV
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromCRA || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development|test)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const baseConfig = {
  staging: {
    panoptesAppId: '07b373e6941a6aaeb990c0b5167dee8875d44260b969567c3aae1e0283ecd9ab',
  },
  production: {
    panoptesAppId: '07b373e6941a6aaeb990c0b5167dee8875d44260b969567c3aae1e0283ecd9ab',
  },
}

baseConfig['development'] = baseConfig.staging
baseConfig['testing'] = baseConfig.staging

const config = baseConfig[env];
export { config, env }

function locationMatch(regex) {
  var match;
  const { location } = window
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex)
  }
  return (match && match[1]) ? match[1] : undefined
}
