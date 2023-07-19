# Mugen Docs

<details>
<summary>目录</summary>

-   [简介](#简介)
-   [主要功能](#主要功能)
-   [快速开始](#快速开始)
    -   [支持的平台](#支持的平台)
    -   [依赖](#依赖)
    -   [安装 Wails](#安装-wails)
    -   [本地启动](#本地启动)
    -   [编译](#编译)
-   [文档](#文档)
-   [开启日志](#开启日志)
</details>

## 简介

一款 Mugen 文档展示程序，同时为人物包提供开关控制程序。

## 主要功能

-   **美观的人物文档：** 使用 `.md` 文件编写人物包文档。
-   **自定义人物开关控制程序**：支持作者自定义人物包的开关配置。

## 快速开始

### 支持的平台

> -   Windows 10/11 AMD64/ARM64
> -   MacOS 10.13+ AMD64
> -   MacOS 11.0+ ARM64
> -   Linux AMD64/ARM64

### 依赖

> -   Go 1.18+
> -   NPM (Node 15+)

### 安装 Wails

```sh
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

更多详细信息请阅读 [Wails 文档](https://wails.io/zh-Hans/docs/introduction)

### 本地启动

```sh
wails dev
```

### 编译

```sh
wails build
```

## 文档

-   `./data/docs.json` 文件配置文档信息。
-   `./data/options.json` 文件配置人物包开关信息。
-   程序启动后会创建 `./data/windows.json` 文件，保存程序相关信息。

[配置详情](./data/README.md)

## 开启日志

`./data/windows.json` 文件中 `log` 属性设置为 `true` 启用日志。默认 `false`。
