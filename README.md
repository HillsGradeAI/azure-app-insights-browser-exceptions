# azure-app-insights-browser-exceptions
A sample site to automatically monitor and log your browser-side exceptions in Azure Application Insights. This code will ensure that both unhandled and custom exceptions are tracked and sent to Application Insights.



### Project structure
app-insights-test/
├── dist/
│   └── bundle.js
├── src/
│   └── index.js
├── .babelrc
├── index.html
├── package.json
└── webpack.config.js

### Clone the project

### Configure
Open src/index.js file and replace INSTRUMENTATION KEY with your key

### Build the project
npm run build

## Serve the index.html file using a local server
### For Python 3:
python -m http.server 8000
### For Python 2:
python -m SimpleHTTPServer 8000

## Serve the index.html file using Node.js
### Install http-server:
npm install -g http-server
### Run the server:
http-server -p 8000


After running the appropriate command, open your browser and navigate to http://localhost:8000. You should see your index.html file being served.

