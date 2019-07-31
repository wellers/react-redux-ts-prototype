# ts-prototype

A project demonstrating the use of ASP.NET Core, TypeScript, React, LESS styling, and webpack bundling, among other things.


## Building

### Prerequisites

Make sure these are installed first:

- [Node.js and npm](https://nodejs.org/en/download/)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
  - [NPM Task Runner extension](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner)

### Initial prep

1. Clone this repository locally
2. On the command line, navigate to `ecms-ts-prototype\ecms-ts-prototype`
3. Type `npm install` to install npm dependencies for the client-side app

### Day-to-day dev

1. Open `ts-prototype.sln` in Visual Studio
   - The NPM Task Runner should start running `npm run watch` in the background to continuously build the client-side app
   - The build output of the client-side app ends up in the `wwwroot` folder for ASP.NET Core
2. Run the project
   - IIS Express will serve the ASP.NET Core project, which in turn will provide the app to the browser


## Folder Structure

```
ts-prototype/
|-- app/                  Source directory for the client-side app
|   |-- components/       React components
|   |-- index.html        Template for the single page app index
|   `-- index.tsx         The main JS entry point for the app
|-- wwwroot/              Target directory for the client-side app's build
|-- package.json          Describes the client-side app's dependencies
|-- package-lock.json     Describes the client-side app's dependencies
|-- Program.cs            Entry point for the server-side ASP.NET Core app
|-- Startup.cs            ASP.NET Core Startup class
|-- tsconfig.json         TypeScript compiler configuration
|-- webpack.config.json   Webpack bundler configuration
```
