import moment from "moment";
moment.locale('en-gb'); 
import * as FileSystem from 'expo-file-system';

export const getMonthData = async (searchMonth, daysInMonth) => {
  // Initialize an array to store days of the month the goal was completed
  const monthData = new Array(daysInMonth).fill(0);
  //console.log(searchMonth);
  // Parse the searchWeek string into a moment object
  const searchDate = moment(searchMonth, "YYYY:MM");
  //console.log("Search Date: ", searchDate)
  //console.log(searchDate);

  // Read the file
  const fileUri = FileSystem.documentDirectory + 'dummyData.txt';
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
      //console.log(searchDate.month());
      // Check if the date is within the same month as the search date
      if (date.month() === searchDate.month()) {
        //console.log(minutes)
        // Add the minutes to the correct day of the month
        //console.log(date.date());
        monthData[date.date()-1] += parseInt(minutes) / 60; // Convert minutes to hours
        //console.log(monthData[date.date()-1]);
      }
    }
  }
  //console.log(monthData); 
  return monthData;

}
