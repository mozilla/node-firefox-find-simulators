var path = require('path');

module.exports = getConstants;

var firefoxProfilesDir = {
  darwin: 'Library/Application Support/Firefox/Profiles',
  linux: '.mozilla/firefox',
  windows: 'TO DO' // TODO Windows
};

var simulatorBinary = {
  darwin: 'b2g/B2G.app/Contents/MacOS/b2g-bin',
  linux: 'b2g/b2g-bin',
  windows: 'TODO' // TODO Windows
};


function getHomeDir(platform) {
  var homeEnvVar;

  if(platform === 'win32') {
    homeEnvVar = 'USERPROFILE';
  } else {
    homeEnvVar = 'HOME';
  }

  return process.env[homeEnvVar];
}


function getFirefoxProfilesDir(platform) {
  var home = getHomeDir(platform);
  return path.join(home, firefoxProfilesDir[platform]);
}


function getSimulatorBinary(platform) {
  return simulatorBinary[platform];
}


function getConstants(platform) {
  return {
    firefoxProfilesDir: getFirefoxProfilesDir(platform),
    simulatorBinary: getSimulatorBinary(platform)
  };
}

