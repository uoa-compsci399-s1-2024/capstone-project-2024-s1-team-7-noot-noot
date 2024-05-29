import moment from "moment";
moment.locale('en-gb'); 
import * as FileSystem from 'expo-file-system';

export const updateWeekData = async (searchWeek) => {
  // Initialize an array to store the total time for each day of the week
  const weekData = new Array(7).fill(0);

  // Parse the searchWeek string into a moment object
  const searchDate = moment(searchWeek, "YY:WW");

  // Read the file
  const fileUri = FileSystem.documentDirectory + 'data.txt';
  const data = await FileSystem.readAsStringAsync(fileUri);
  const lines = data.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim(); // Remove leading and trailing spaces
    
    if (trimmedLine.length > 1) {
      const parts = trimmedLine.split(' ');
      const dateStr = parts[0];
      const minutes = parts[2];

      // Parse the date string into a moment object
      const date = moment(dateStr, "YYYY:MM:DD");
      // // // console.log(date);

      // Check if the date is within the same week as the search date
      if (date.isoWeek() === searchDate.isoWeek()) {
        // Add the minutes to the correct day of the week
        const dayOfWeek = date.isoWeekday() - 1; // Adjust to start from 0 (Monday)
        weekData[dayOfWeek] += parseInt(minutes) / 60; // Convert minutes to hours
      }
    }
  }
  return weekData;
}
