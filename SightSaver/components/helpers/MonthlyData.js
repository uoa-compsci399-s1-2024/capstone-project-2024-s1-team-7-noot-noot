import moment from "moment";
moment.locale('en-gb'); 
import * as FileSystem from 'expo-file-system';

export const getMonthData = async (searchMonth, daysInMonth, searchSensorId) => {
  const monthData = new Array(daysInMonth).fill(0);
  const searchDate = moment(searchMonth, "YYYY:MM");

  const fileUri = FileSystem.documentDirectory + 'data.txt';

  try {
    const data = await FileSystem.readAsStringAsync(fileUri);
    const lines = data.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.length > 1) {
        const parts = trimmedLine.split(' ');
        const dateStr = parts[0];
        const minutes = parts[2];
        const sensorId = parts[3];
  
        const date = moment(dateStr, "YYYY:MM:DD");
        if (date.month() === searchDate.month() && date.year() === searchDate.year() && sensorId === searchSensorId) {
          monthData[date.date()-1] += parseInt(minutes) / 60; // Convert minutes to hours
        }
      }
    }
  } catch (error) {
    monthData.fill(0);
  }

  return monthData;
}
