const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function deleteFiles(directory, fileExtension) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      rl.close();
      return;
    }

    const filteredFiles = files.filter(file => path.extname(file) === `.${fileExtension}`);

    filteredFiles.forEach(file => {
      const filePath = path.join(directory, file);
      fs.unlink(filePath, err => {
        if (err) {
          console.error('Error deleting file:', filePath, err);
        } else {
          console.log('Deleted file:', filePath);
        }
      });
    });

    rl.close();
  });
}

rl.question('Enter the directory path: ', (directory) => {
  rl.question('Enter the file extension (without the dot): ', (fileExtension) => {
    deleteFiles(directory, fileExtension);
  });
});