### Note: The source code of the applications involved in this project is provided solely for community use. The authors of this project will not be held responsible for any legal liability incurred from using the code for other purposes.

Usage
-------
> ./Cocos-Creator -\-project 'PROJECT_PATH' -\-path 'PROJECT_PATH' -\-build 'platform=web-mobile;buildPath=BUILD_PATH'

### Get Assets
1.Get the assets on Windows or Mac build according to this page, Cocos Creator 2.4.6 is supported:

[CocosCreator(2.1～3.0)のエディタソースを解凍し、Electronコマンドで起動できるかの検](https://qiita.com/chooaya/items/d2ed0caa31c336973226 "CocosCreator(2.1～3.0)のエディタソースを解凍し、Electronコマンドで起動できるかの検")証



> You can find the copy_editor.js and ccc2js.js in this repo.

resources <br>
├── app <br>
&nbsp;&nbsp;     ├── app.js <br>
&nbsp;&nbsp;    ├── asset-db <br>
&nbsp;&nbsp;    ├── build <br>
&nbsp;&nbsp;    ├── dashboard <br>
&nbsp;&nbsp;    ├── editor <br>
&nbsp;&nbsp;    ├── editor-framework <br>
&nbsp;&nbsp;    ├── electron.icns <br>
&nbsp;&nbsp;    ├── node_modules  (replace it) <br>
&nbsp;&nbsp;    ├── package.json  (replace it) <br>
&nbsp;&nbsp;    ├── share <br>
 &nbsp;&nbsp;   └── themes <br>
├── app.asar.unpacked <br>
├── builtin <br>
├── cocos2d-x <br>
├── default_app.asar <br>
├── electron.icns <br>
├── engine <br>
├── lib     (Optional for AppImage, create by yourself) <br>
├── LICENSE.rtf <br>
├── static <br>
├── templates <br>
└── utils  (replace it) <br>

Electron Build
-------

1.Add G_SLICE prefix to fix crashing on Ubuntu23.10
>  /resources/app.js <br>
>process.env.G_SLICE='always-malloc'

2.Install node@14.16.1 in your system

3.Install npm dependencies
> npm i  electron@11.2.0 sharp@0.28.3 electron-builder@20.0.7

4.Replace the 'node_modules', 'package.json' and 'utils' by this repo.

5.Copy all files and folders in /resources from Windows/Mac install, except app.asar. 

6.**Now you are able to run with electron! **
> cd /resources/app <br>
electron .

![alt text](https://github.com/forza91/CocosCreatorLinux/blob/main/screenshot3.png)
![alt text](https://github.com/forza91/CocosCreatorLinux/blob/main/screenshot2.png)

AppImage Build
-------
**Since Appimage is read-only inside, we need to fix the cache dir frist.**

1.Ignore internal assets auto saving /resources/app/asset-db/lib/meta.js

> if(a.indexOf("default-assets")==-1){ <br>
    t.writeFileSync(a,JSON.stringify(i,null,2));<br>
}

2.Fix build cache path /resources/app/editor/core/gulp-build.js

> ...<br>
os = require('os'),<br>
...<br>
jsCacheDir:Editor.url(os.homedir()+"/.cache/"+G),
    
3.Remove /resources/cocos2d-x/simulator/mac

4.Build AppImage
npm run build

**The exec file will be in ./dist !!**

![alt text](https://github.com/forza91/CocosCreatorLinux/blob/main/screenshot.png)


Trouble Shooting
-------

1.This version only supports Debian12, Ubuntu20-23 or the other distros published at the near time, such as Arch linux. Latest Linux will be crashed due to the sharp@0.28.3 and libvip libraries. You can found them in /resources/utils.

In AppImage, one possible solution is to replace the system libs by the libs from Debian12/Ubuntu20, however I dont know which one will fix the issue.

   A.Place the libs in /resources/lib

   B.Add the env in /resources/app.js
   > process.env.LD_LIBRARY_PATH = process.resourcesPath + '/lib';
    
2.Only Cocos Creator 2.4.3 ~ 2.4.6 is tested, it's not able to translate ccc to js in 2.4.7 and above.

3.Cocos may fail at first time build in a new BUILD_PATH, just re-build again.

4.There are some inhouse modules from Cocos in **/resources/app/node_modules**, such as @base.
    

