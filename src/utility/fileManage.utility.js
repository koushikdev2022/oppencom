const { HttpException } = require("./exceptions/httpException");
const fs = require("fs").promises;
const util = require("util");
const path = require("path");

exports.ensureDirectoryExists = async (dirPath) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        // Explicitly set permissions after creation
        await fs.chmod(dirPath, 0o777);
    } catch (error) {
        console.error(`Error creating folder at ${dirPath}:`, error.message);
    }
};

exports.destroyFile = async (path) => {
    try {
        await fs.unlink(path);
        console.log("File deleted successfully:", path);
    } catch (error) {
        console.error("Error deleting file:", error.message);
    }
};

exports.destroyFolder = async (path) => {
    try {
        await fs.rm(path, { recursive: true, force: true });
        console.log("Folder deleted successfully:", path);
    } catch (error) {
        console.error("Error deleting folder:", error.message);
    }
};

exports.renameFile = async ({ currentPath, newPath }) => {
    try {
        // Validate parameters
        if (!currentPath || !newPath) {
            throw new Error('Both currentPath and newPath are required');
        }

        // Check if source file exists
        try {
            await fs.access(currentPath);
        } catch {
            throw new Error(`Source file does not exist: ${currentPath}`);
        }

        // Ensure destination directory exists
        const destDir = path.dirname(newPath);
        await fs.mkdir(destDir, { recursive: true });

        // Rename the file
        await fs.rename(currentPath, newPath);
        console.log(`File Rename Success: ${path.basename(currentPath)} -> ${newPath}`);
        return true;

    } catch (error) {
        console.error(`Error renaming file from ${currentPath} to ${newPath}:`, error.message);
        throw new Error(`File rename failed: ${error.message}`);
    }
};