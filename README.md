# React Native ToDo List App Using Themes

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

# Overview

This repository contains multiple React Native applications demonstrating different features and functionalities.

- ## ToDo List App

  This ToDo List app allows users to add, edit, delete, and update tasks. It utilizes AsyncStorage for storing tasks locally on the device. The app supports light and dark themes and dynamically adjusts based on the device's color scheme.

- ## Navigation Example

  This app demonstrates basic navigation using React Navigation. It consists of a single screen with a simple "Home Screen" message.

- ## AsyncStorage Demo
  This app showcases the usage of AsyncStorage in React Native. It allows users to input text and stores it locally on the device using AsyncStorage.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:
You can Always Change The app you want to run by commenting and uncommenting _Index.js_ code lines

## Technologies Used

- React Native
- AsyncStorage
- React Navigation

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
