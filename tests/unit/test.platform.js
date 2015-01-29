'use strict';

var platform = require('../../lib/platform');

module.exports = {

  setUp: function(next) {
    this.oldHOME = process.env.HOME;
    this.oldUSERPROFILE = process.env.USERPROFILE;
    process.env.HOME = '/home/testuser';
    process.env.USERPROFILE = 'C:\\Users\\testuser';
    next();
  },

  tearDown: function(next) {
    process.env.HOME = this.oldHOME;
    process.env.USERPROFILE = this.oldUSERPROFILE;
    next();
  },

  'darwin': function(test) {
    // This is here because we use underscores in the paths to these binaries.
    /*jshint camelcase: false*/
    testDeepEqualPaths(test, platform('darwin'), {
      firefoxProfilesDir: '/home/testuser/Library/Application Support/Firefox/Profiles',
      simulatorBinary: function(version) {
        if (version === '1_2' || version === '1_3') {
          return 'resources/fxos_' + version + '_simulator/data/mac64/B2G.app/Contents/MacOS/b2g-bin';
        } else {
          return 'b2g/B2G.app/Contents/MacOS/b2g-bin';
        }
      }
    });
    test.done();
  },

  'linux': function(test) {
    testDeepEqualPaths(test, platform('linux'), {
      firefoxProfilesDir: '/home/testuser/.mozilla/firefox',
      simulatorBinary: function(version) {
        return 'b2g/b2g-bin';
      }
    });
    test.done();
  },

  'win32': function(test) {
    testDeepEqualPaths(test, platform('win32'), {
      // HACK: On posix platforms, path.join results in this
      firefoxProfilesDir: 'C:\\Users\\testuser/AppData\\Local\\Mozilla\\Firefox\\Profiles',
      simulatorBinary: function(version) {
        return 'b2g\\b2g-bin.exe';
      }
    });
    test.done();
  }

};

function testDeepEqualPaths(test, result, expected) {
  if (process.platform === 'win32') {
    // HACK: Correct expected path when running tests on win32
    expected.firefoxProfilesDir = expected.firefoxProfilesDir.replace(/\//g,'\\');
  }
  return test.deepEqual(result, expected);
}
