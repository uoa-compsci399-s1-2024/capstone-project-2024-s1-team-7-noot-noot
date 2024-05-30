import * as FileSystem from 'expo-file-system';

// Function to convert data from file
export const JSONToEncoded = async (inputFilePath, outputFilePath) => {
  try {
    // Read the input file
    const fileUri = `${inputFilePath}`;
    const outputUri = `${outputFilePath}`;
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const lines = fileContent.trim().split('\n');

    let outputLines = [];
    let previousTime = null;
    let counter = 0;

    lines.forEach(line => {
      // Convert the line to a dictionary
      const record = JSON.parse(line.trim());

      // Parse the current record's date and time
      const currentTime = new Date(record.date_time);

      if (previousTime !== null) {
        const timeDiff = (currentTime - previousTime) / 1000; // time difference in seconds
        if (timeDiff === 1) {
          counter++;
        } else {
          const minutes = Math.floor(counter / 60);
          outputLines.push(
            `${previousTime.getFullYear()}:${String(previousTime.getMonth() + 1).padStart(2, '0')}:${String(previousTime.getDate()).padStart(2, '0')} ${String(previousTime.getHours()).padStart(2, '0')}:${String(previousTime.getMinutes()).padStart(2, '0')}:${String(previousTime.getSeconds()).padStart(2, '0')} ${minutes} ${record.sensor_id}\n`
          );
          counter = 1;
        }
      } else {
        counter = 1;
      }

      previousTime = currentTime;
    });

    // Add the last accumulated counter
    if (previousTime !== null) {
      const minutes = Math.floor(counter / 60);
      outputLines.push(
        `${previousTime.getFullYear()}:${String(previousTime.getMonth() + 1).padStart(2, '0')}:${String(previousTime.getDate()).padStart(2, '0')} ${String(previousTime.getHours()).padStart(2, '0')}:${String(previousTime.getMinutes()).padStart(2, '0')}:${String(previousTime.getSeconds()).padStart(2, '0')} ${minutes} ${JSON.parse(lines[lines.length - 1].trim()).sensor_id}\n`
      );
    }

    // Write the output to a file
    await FileSystem.writeAsStringAsync(outputUri, outputLines.join(''));

    console.log(`Data has been converted and written to ${outputFilePath}`);
  } catch (error) {
    console.log('Error converting data:', error);
  }
};
