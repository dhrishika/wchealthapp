

# Womanova App
Welcome to the Womanova App Source Code! This application was built using the [Ionic Framework](https://ionicframework.com/framework)!
>Login to Hostinger.com for access to the application data, server-side files, and the [WordPress content managment system](http://womanovaapp.com/).
## How to set up your device for development:

### Set up your environment:
  - Install an editor or IDE. With Ionic being built on ES6 and TypeScript, it's important that your editors or IDE can support these new languages.
	  - (Recommended) Download [VSCode Editor](https://code.visualstudio.com/)
	  - (Recommended) Install [Ionic Extension Pack for VSCode](https://marketplace.visualstudio.com/items?itemName=loiane.ionic-extension-pack)
  - Follow the [Ionic Framework Documentation](https://ionicframework.com/docs/intro/installation/)
  - Download [Node.JS](https://nodejs.org/)
---
### Downloading and Accessing Ionic Files
Clone this repository in the folder in which you'd like to contain the project:  
```
$ git clone https://github.com/dhrishika/wchealthapp.git
```
Now either open the application folder in your favorite IDE (that has a terminal window) or `cd` into the new cloned project directory through terminal:
```
$ cd wchealthapp
```
### Ionic CLI and Cordova

With Node and NPM setup, let’s install the Ionic and Cordova CLI.

```
$ npm install -g ionic cordova
```

> Note: The  `-g`  means this is a global install, so for Window’s you will need to open an Admin command prompt. For Mac/Linux, you’ll need to run the command with  `sudo`:
> ``
$ sudo npm install -g ionic cordova
``

### Installing Dependencies
You will need to get all the `node_modules`  into your application. All these modules are based on the `package.json` file in this app.
```
$ npm install
```
---

### Preview the app
To get a quick preview of your app in the browser, use the `serve` command:
```
$ ionic serve
```
>Easily spin up a development server which launches in your browser. It watches for changes in your source files and automatically reloads with the updated build.
By default,  `ionic serve`  boots up a development server on all network interfaces and prints the external address(es) on which your app is being served.

To see multiple platforms at once, use the `lab` option in the command:
```
$ ionic lab serve
```
---
## New to Ionic?
### What is Ionic Framework?

Ionic Framework is an open source SDK that enables developers to build performant, high-quality mobile apps using familiar web technologies (HTML, CSS, and JavaScript).

### What is the Ionic CLI?

The  [CLI](https://ionicframework.com/docs/resources/what-is/#cli), or command line interface, is a tool that provides a number of helpful commands to Ionic developers. In addition to installing and updating Ionic, the CLI comes with a built-in development server, build and debugging tools, and much more.

### What are components?

Components in Ionic are reusable UI elements that serve as the building blocks for your mobile app. Components are made up of HTML, CSS, and sometimes JavaScript. Every Ionic component adapts to the platform on which your app is running.

### How does navigation work?

Navigation works like a stack —  **push**  a page to the stack to navigate to it, and  **pop**  to go back. Modals and alerts can also be displayed by pushing them onto the navigation stack.

### What is Angular?

[Angular](https://angular.io/)  is the underlying framework that powers Ionic. It is responsible for the component API that is the building block of Ionic. For an overview on Angular, be sure to checkout the official  [Angular Docs](https://angular.io/docs/ts/latest/).


## Further Readings and Resources

 - [Ionic Developer
   Resources](https://ionicframework.com/docs/developer-resources/#)
 - [Ionic Developer Concepts](https://ionicframework.com/docs/intro/concepts/)
 - [Ionic Developer Glossary](https://ionicframework.com/docs/developer-resources/what-is) 
 - [Ionic Tutorial App](https://ionicframework.com/docs//intro/tutorial/)
 - [Editors and IDEs](https://ionicframework.com/docs/developer-resources/editors_and_ides/)
 - Learning Resources and Tutorials: [Josh Morony](https://www.joshmorony.com/)
