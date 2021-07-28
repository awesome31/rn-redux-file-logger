# REACT NATIVE REDUX FILE LOGGER

### Introduction

This project exports a middleware that creates a csv log file in the android/ios file system. It has the following functionalities:

1. Gives the developer control over what actions need to be logged inside the csv file.
2. Can be plugged into any project with minimal setup.
3. Provides the name of the CSV file back to the project so that the user can use it to either send to the server or email or do anything with it.
4. Fault tolerant if any of the write calls to the file system fails.

### Requirements

This project has a peer dependency of [react-native-fs](https://www.npmjs.com/package/react-native-fs). This project requires the project that uses it to have this module installed for file manipulation.

### Usage

This project exports these functions.

- `setupLoggingMiddleware(actionsToIgnore: string[], fileName: string) //Function to create the logging middleware.`

  This function as the name suggests creates a loggingMiddleware that can be plugged inside any application. It takes two arguments:

  1. **actionsToIgnore**: Array of actions that need to be ignored by the middleware.
  2. **actionsToSkipPayload**: Array of actions whose payload need to be ignored to by the middleware.
  3. **fileName**: Name of the file where the logs are stored. Give the file with an extension. By default name is _logs.csv_.

- `getFileName() //Function to get the file name and file path.`

  This function helps in getting the file name and the file path.

- `deleteFile() //Function to delete the logs file.`

  This function deletes the log file from the file system.

- `getFileContent(encoding: ('ascii' | 'base64' | 'utf8')) // Function to get the file content.`

  This function return a promise which has the file content in it. Encoding can be passed as an argument. utf8 by default.

- `purgeFileContent(noOfDays: number) //Function to purge the file content.`

  This function will purge the contents of the file based on the noOfDays that are passed. All rows that have a timepstamp less than noOfDays ago will be purged.
