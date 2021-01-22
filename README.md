# electron-app

## dev

```
yarn start
```

## pack

```
yarn build:prod
yarn pack:mac
```

## 关于打包

`react`和`react-dom`等放到dependencies里会导致最终体积比较大，所以直接用webpack打包

## icons

* icon.icns: macOS app icon, at least 512x512
* icon.ico: Windows app icon, at least 256x256
* icon.png
