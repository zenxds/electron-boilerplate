# electron-app

```
export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

## dev

```
yarn start
```

## pack

```
yarn build:prod
yarn dist
```

## icons

[icons](https://www.electron.build/icons)

```
yarn icons
```

## 关于打包

`react`和`react-dom`等放到dependencies里会导致最终体积比较大，所以直接用webpack打包

mac下electron-builder必须进行签名，参考[code-signing](https://www.electron.build/code-signing)和[Electron 打包Mac安装包代码签名问题解决方案](https://segmentfault.com/a/1190000012902525)
