'use strict';

var path = require('path');

module.exports = getConstants;

var firefoxProfilesDir = {
  darwin: 'Library/Application Support/Firefox/Profiles',
  linux: '.mozilla/firefox',
  win32: 'AppData\\Roaming\\Mozilla\\Firefox\\Profiles'
};

var simulatorBinary = {
  darwin: {
    standardPath: 'b2g/B2G.app/Contents/MacOS/b2g-bin',
    version1x2: 'resources/fxos_1_2_simulator/data/mac64/B2G.app/Contents/MacOS/b2g-bin',
    version1x3: 'resources/fxos_1_3_simulator/data/mac64/B2G.app/Contents/MacOS/b2g-bin'
  },
  linux: 'b2g/b2g-bin',
  win32: 'b2g\\b2g-bin.exe'
};


function getHomeDir(platform) {
  var homeEnvVar;

  if (platform === 'win32') {
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
