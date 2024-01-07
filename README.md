# Website-Watcher
The Website Watcher project is a simple tool for monitoring changes in specified sections of HTML files. It can be used to track content changes in websites and receive alerts when predefined keywords are detected.

## How It Works
The Website Watcher script performs the following steps:

1. **Fetch HTML Content:**
   - Reads the content of the specified HTML file using the `fs` (file system) module.
   - Parses the HTML content using `cheerio` to create a jQuery-like object for easy traversal.

2. **Get Section Content:**
   - Retrieves the text content of specified sections in the HTML using CSS selectors.

3. **Calculate Hash:**
   - Computes the SHA-256 hash of the section content.

4. **Check for Changes:**
   - Compares the current hash with the previously stored hash.
   - If a difference is detected, changes are logged to the console.

5. **Continuous Monitoring:**
   - The script runs continuously, periodically checking for changes.

## Required Packages

- **Node.js**: A JavaScript runtime used to execute the project.
- **npm (Node Package Manager)**: Manages project dependencies.
- **Cheerio**: A fast, flexible, and lean implementation of jQuery designed for the server-side. Used for parsing HTML.
- **Crypto**: A Node.js module for cryptographic operations. Used for calculating hash values.
- **Nodemon**: Monitors changes in the source code and automatically restarts the server.

## How to Run the Server

1. **Install Dependencies:**
   After installing required packages to start server commmand "npm start".
