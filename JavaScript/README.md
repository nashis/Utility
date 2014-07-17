# client-info.js

### Description

Light-weight tool based on JavaScript Navigator object to determine Broswer, OS, CPU, and Platform information

### Features

* Get the broswer details along with minor version
* Get the OS name - Version info needs to be added
* Get the platform information - For windows machines 16/32/64 bit
* Get the CPU details - Currently not supported

### Usage

##### Example

We could include this JavaScript file in our application and use in the following way:

```js
    clientInfo.getOS();
    clientInfo.getBrowserName();
    clientInfo.getPlat();
    clientInfo.getCPU();
```

# utils.js

### Description

Few utility functions to help work with JavaScript better

### Features

* getDataType - Get the type of a given variable for strict type checking

##### Example

We could include this JavaScript file in our application and use in the following way:

```js
    Utils.getDataType("123");
```