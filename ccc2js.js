var fs = require("fs");
var convertCCCFileTojsUtility;
//module.exports.convertCCCFileTojsUtility("D:\\unpack\\app");
(function () {
  if (convertCCCFileTojsUtility == null) {
    convertCCCFileTojsUtility = {};
  }
  var compiler = null;
  try {
    //require("fix-electron-require");
    
    //!Important electron_common_compile is not working since Cocos 2.4.7
    compiler = process._linkedBinding("electron_common_compile");
    
  } catch (e) {
    console.log(e);
  }
  convertCCCFileTojsUtility.getBaseNameWithOutExt = function (filePath) {
    return filePath
      .split(".")
      .filter((c, i, a) => i < a.length - 1)
      .join(".");
  };

  convertCCCFileTojsUtility.loadCCC = function (filePath) {
    try {
      let compiler2Ret = Buffer.from(compiler.test2(filePath)).toString();
      return compiler2Ret;
    } catch (error) {
      console.log(error);
    }
  };

  convertCCCFileTojsUtility.convertCCCFileTojsUtility = function (
    cccSourceListPath
  ) {
    (async () => {
      let cccFileList = await new Promise((resolve) =>
        require("glob")(cccSourceListPath + "/**/*.ccc", {}, (err, files) => {
          resolve(files);
        })
      );
      let editorcccList = await new Promise((resolve) =>
        require("glob")(
          cccSourceListPath + "/**/.editor.ccc",
          {},
          (err, files) => {
            resolve(files);
          }
        )
      );
      let workflowcccList = await new Promise((resolve) =>
        require("glob")(
          cccSourceListPath + "/**/.workflow.ccc",
          {},
          (err, files) => {
            resolve(files);
          }
        )
      );
      cccFileList = cccFileList.concat(editorcccList).concat(workflowcccList);
      try {
        for (let index = 0; index < cccFileList.length; index++) {
          const cccFilePath = cccFileList[index];
          let jsVersionPath =
            convertCCCFileTojsUtility.getBaseNameWithOutExt(cccFilePath) +
            ".js";
          let cccFileContent = convertCCCFileTojsUtility.loadCCC(cccFilePath);
          fs.writeFileSync(jsVersionPath, cccFileContent);
          console.info(
            (index + 1).toString() + "/" + cccFileList.length + ":done"
          );
          if (fs.existsSync(jsVersionPath)) {
            // 以前の.cccファイル削除
            try {
              fs.unlinkSync(cccFilePath);
            } catch (error) {
              console.warn(error);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }

      console.info("all ccc file convert process is over");
    })();
  };
})();
module.exports = convertCCCFileTojsUtility;


//Excute this in chrome devtool
//module.exports.convertCCCFileTojsUtility("/Users/user/app");
