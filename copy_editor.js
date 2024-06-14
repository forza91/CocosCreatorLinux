var fs = require("fs");
var app = require("electron").remote.app;
var CopyUtil;
//module.exports.copyFileOutsideOfElectronAsar("./","D:\\unpack\\app")
(function () {
  if (CopyUtil == null) {
    CopyUtil = {};
  }
  CopyUtil.isFile = function (filePath) {
    try {
      let r = fs.readFileSync(filePath);
      if (r != null) {
        return true;
      }
    } catch (error) { }
    return false;
  };
  CopyUtil.isDirectory = function (filePath) {
    try {
      fs.readFileSync(filePath);
      return false;
    } catch (error) {
      return true;
    }
  };
  CopyUtil.copyFileOutsideOfElectronAsar = function (
    sourceInAsarArchive,
    destOutsideAsarArchive
  ) {
    // file will be copied
    if (
      CopyUtil.isFile(
        app.getAppPath() + "/" + sourceInAsarArchive
      )
    ) {
      console.log(app.getAppPath() + "/" + sourceInAsarArchive + ":isFile");
      let content = fs.readFileSync(
        app.getAppPath() + "/" + sourceInAsarArchive
      );
      fs.writeFileSync(destOutsideAsarArchive, content);
    }

    // dir is browsed
    else if (CopyUtil.isDirectory( app.getAppPath() + "/" + sourceInAsarArchive)) {

      if (sourceInAsarArchive !== "./") {
        fs.mkdirSync(destOutsideAsarArchive);
      }
      console.log(
        app.getAppPath() + "/" + sourceInAsarArchive + ":isDirectory"
      );
      let directory = app.getAppPath() + "/" + sourceInAsarArchive;
      if (sourceInAsarArchive === "./") {
        directory = app.getAppPath();
      }
      fs.readdirSync(directory).forEach(function (fileOrFolderName) {
        console.log(
          app.getAppPath() + "/" + sourceInAsarArchive + ":" + fileOrFolderName
        );

        if (fileOrFolderName != "browserify"
        && fileOrFolderName != "uglifyjs"
        && fileOrFolderName != "tsc"
        && fileOrFolderName != "tsserver"
        && fileOrFolderName != "semver"
         && fileOrFolderName != "terser") { //fix folder error
          CopyUtil.copyFileOutsideOfElectronAsar(
            sourceInAsarArchive + "/" + fileOrFolderName,
            destOutsideAsarArchive + "/" + fileOrFolderName
          );
        }


      });
    }
  };
})();

module.exports = CopyUtil;

//Excute this in chrome devtool
//module.exports.copyFileOutsideOfElectronAsar("./", "/Users/user/app");
