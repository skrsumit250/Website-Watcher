const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require('crypto');

class WebsiteWatcher {
    constructor(filePath, sectionSelectors, keywords) {
        this.filePath = filePath;
        this.sectionSelectors = sectionSelectors;
        this.keywords = keywords;
        this.previousHashes = new Map();
    }

    async getSectionContents() {
        try {
            const content = fs.readFileSync(this.filePath, 'utf-8');
            const $ = cheerio.load(content);

            const sectionContents = new Map();
            this.sectionSelectors.forEach(selector => {
                const section = $(selector).text().trim();
                sectionContents.set(selector, section);
            });

            return sectionContents;
        } catch (error) {
            console.error(`Error reading ${this.filePath}: ${error.message}`);
            return null;
        }
    }

    calculateHash(content) {
        return crypto.createHash('sha256').update(content, 'utf-8').digest('hex');
    }

    async checkForChanges() {
        const sectionContents = await this.getSectionContents();
    
        if (sectionContents !== null) {
            let changesDetected = false;
    
            sectionContents.forEach((content, selector) => {
                const currentHash = this.calculateHash(content);
    
                if (currentHash !== this.previousHashes.get(selector)) {
                    this.previousHashes.set(selector, currentHash);
                    changesDetected = true;
    
                    // Log the timestamp when changes are detected
                    console.log(`Changes detected in ${this.filePath} at ${new Date().toLocaleString()} in section ${selector}`);

                }
            });
    
            return changesDetected;
        }
    
        return false;
    }

    async monitorWebsite() {
        while (true) {
            if (await this.checkForChanges()) {
                console.log(`Changes detected in ${this.filePath}`);
            }
            await new Promise(resolve => setTimeout(resolve, 10000)); // Check every 10 seconds
        }
    }
}

const filePath = path.join(__dirname, 'index.html');
const sectionSelectors = ['.content-section1', '.content-section2'];
const keywords = ['keyword1', 'keyword2'];

const watcher = new WebsiteWatcher(filePath, sectionSelectors, keywords);
watcher.monitorWebsite();
