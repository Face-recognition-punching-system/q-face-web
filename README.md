<h1 align="center">
    人脸识别考勤系统管理界面
</h1>

## 🚀 快速开始

### 环境

- Windows 10
- Visual Studio Code
- node.js 18.13.0
- npm 8.5.3

### 拉取代码

```bash
git clone https://github.com/Face-recognition-punching-system/q-face-web.git
```

### 安装依赖

```bash
npm install
```

### 调试

```bash
npm run dev
```

### 部署

```bash
npm run serve
```

## 🌲 目录树

```text
├── .eslintrc.json
├── .vscode/
|  └── settings.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── src/
|  ├── layouts/
|  |  └── indexLayout.tsx
|  ├── pages/
|  |  ├── 404.tsx
|  |  ├── api/
|  |  |  ├── auth/
|  |  |  |  └── [...nextauth].ts
|  |  |  ├── dist/
|  |  |  |  └── hello.js
|  |  |  ├── getWorkerImg.ts
|  |  |  ├── signIn.ts
|  |  |  ├── updateFeedback.ts
|  |  |  ├── updatePassword.ts
|  |  |  ├── updateWorkerImg.ts
|  |  |  └── workerClock.ts
|  |  ├── auth/
|  |  |  └── signIn.tsx
|  |  ├── dist/
|  |  |  └── index.js
|  |  ├── feedback.tsx
|  |  ├── index.tsx
|  |  ├── workerInfo.tsx
|  |  ├── _app.tsx
|  |  ├── _document.tsx
|  |  └── _error.tsx
|  ├── plugins/
|  ├── public/
|  |  ├── logo.ico
|  |  └── svgs/
|  |     ├── 404.svg
|  |     ├── logo.svg
|  |     └── signIn.svg
|  ├── styles/
|  |  ├── base.less
|  |  ├── border.less
|  |  ├── color.less
|  |  ├── default.less
|  |  ├── distance.less
|  |  ├── flex.less
|  |  ├── font.less
|  |  ├── index.less
|  |  ├── normalize.less
|  |  ├── position.less
|  |  ├── size.less
|  |  └── theme.less
|  └── utils/
|     └── axios.ts
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```

