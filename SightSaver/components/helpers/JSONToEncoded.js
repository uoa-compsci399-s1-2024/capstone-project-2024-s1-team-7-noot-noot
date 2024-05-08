import * as FileSystem from 'expo-file-system';

export const JSONToEncoded = async () => {
  const fileUri = FileSystem.documentDirectory + 'tempData.json';

  // Read the file
  const fileContent = await FileSystem.readAsStringAsync(fileUri);

  // Split the file content into lines
  const lines = fileContent.split('\n');

  // Process each line
  for (let line of lines) {
    // Skip empty lines
    if (!line) continue;

    // Parse the line as a JSON object
    const dataObject = JSON.parse(line);

    // Split the time into date and time parts
    const [date, time] = dataObject.time.split(' ');

    // Calculate the amount of time in minutes from the time value
    const [hour, minute, second] = time.split(':');
    const timeInMinutes = parseInt(hour) * 60 + parseInt(minute) + parseInt(second) / 60;

    // Format the data
    const formattedData = `${date} ${time} ${timeInMinutes.toFixed(2)}`;

    console.log(formattedData);
  }
};