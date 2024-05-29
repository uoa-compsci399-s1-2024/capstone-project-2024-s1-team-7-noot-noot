import moment from "moment";
moment.locale('en-gb'); 
import * as FileSystem from 'expo-file-system';

export const updateDayData = async (searchDate) => {
    var totalTime = 0;
    var dayData = [
    {value: 0, label:'8am'}, //8.00 
    {value: 0, }, //8.05
    {value: 0, }, //8.10
    {value: 0, }, //8.15
    {value: 0, }, //8.20
    {value: 0, }, //8.25
    {value: 0, }, //8.30
    {value: 0, }, //8.35
    {value: 0, }, //8.40
    {value: 0, }, //8.45
    {value: 0, }, //8.50
    {value: 0, }, //8.55
    {value: 0, label:'9am' },
    {value: 0, }, //9.05
    {value: 0, }, //9.10
    {value: 0, }, //9.15
    {value: 0, }, //9.20
    {value: 0, }, //9.25
    {value: 0, }, //9.30
    {value: 0, }, //9.35
    {value: 0, }, //9.40
    {value: 0, }, //9.45
    {value: 0, }, //9.50
    {value: 0, }, //9.55
    {value: 0, label:'10am' },
    {value: 0, }, //10.05
    {value: 0, }, //10.10
    {value: 0, }, //10.15
    {value: 0, }, //10.20
    {value: 0, }, //10.25
    {value: 0, }, //10.30
    {value: 0, }, //10.35
    {value: 0, }, //10.40
    {value: 0, }, //10.45
    {value: 0, }, //10.50
    {value: 0, }, //10.55
    {value: 0, label:'11am' },
    {value: 0, }, //11.05
    {value: 0, }, //11.10
    {value: 0, }, //11.15
    {value: 0, }, //11.20
    {value: 0, }, //11.25
    {value: 0, }, //11.30
    {value: 0, }, //11.35
    {value: 0, }, //11.40
    {value: 0, }, //11.45
    {value: 0, }, //11.50
    {value: 0, }, //11.55
    {value: 0, label:'12pm' },
    {value: 0, }, //12.05
    {value: 0, }, //12.10
    {value: 0, }, //12.15
    {value: 0, }, //12.20
    {value: 0, }, //12.25
    {value: 0, }, //12.30
    {value: 0, }, //12.35
    {value: 0, }, //12.40
    {value: 0, }, //12.45
    {value: 0, }, //12.50
    {value: 0, }, //12.55
    {value: 0, label:'1pm' },
    {value: 0, }, //1.05
    {value: 0, }, //1.10
    {value: 0, }, //1.15
    {value: 0, }, //1.20
    {value: 0, }, //1.25
    {value: 0, }, //1.30
    {value: 0, }, //1.35
    {value: 0, }, //1.40
    {value: 0, }, //1.45
    {value: 0, }, //1.50
    {value: 0, }, //1.55
    {value: 0, label:'2pm' },
    {value: 0, }, //2.05
    {value: 0, }, //2.10
    {value: 0, }, //2.15
    {value: 0, }, //2.20
    {value: 0, }, //2.25
    {value: 0, }, //2.30
    {value: 0, }, //2.35
    {value: 0, }, //2.40
    {value: 0, }, //2.45
    {value: 0, }, //2.50
    {value: 0, }, //2.55
    {value: 0, label:'3pm' },
    {value: 0, }, //2.10
    {value: 0, }, //2.15
    {value: 0, }, //2.20
    {value: 0, }, //2.25
    {value: 0, }, //2.30
    {value: 0, }, //2.35
    {value: 0, }, //2.40
    {value: 0, }, //2.45
    {value: 0, }, //2.50
    {value: 0, }, //2.55
    {value: 0, label:'4pm' },
    {value: 0, }, //4.10
    {value: 0, }, //4.15
    {value: 0, }, //4.20
    {value: 0, }, //4.25
    {value: 0, }, //4.30
    {value: 0, }, //4.35
    {value: 0, }, //4.40
    {value: 0, }, //4.45
    {value: 0, }, //4.50
    {value: 0, }, //4.55
    {value: 0, label:'5pm'},
    {value: 0, }, //5.10
    {value: 0, }, //5.15
    {value: 0, }, //5.20
    {value: 0, }, //5.25
    {value: 0, }, //5.30
    {value: 0, }, //5.35
    {value: 0, }, //5.40
    {value: 0, }, //5.45
    {value: 0, }, //5.50
    {value: 0, }, //5.55
    ];
    // Read the file
    const fileUri = FileSystem.documentDirectory + 'data.txt';
    const data = await FileSystem.readAsStringAsync(fileUri);
    const lines = data.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim(); // Remove leading and trailing spaces
  
      if (trimmedLine.length > 1) {
        const parts = trimmedLine.split(' ');
        const dateStr = parts[0];
        const timeStr = parts[1];
        const minutes = parts[2];
  
        if (dateStr == searchDate) {
          totalTime += parseInt(minutes);
  
          const startTime = moment(timeStr, "HH:mm:ss");
          const endTime = moment(timeStr, "HH:mm:ss").add(minutes, 'minutes');
          
          const startIndex = Math.floor(((startTime.hours() - 8) * 60 + startTime.minutes()) / 5);
          const endIndex = Math.ceil(((endTime.hours() - 8) * 60 + endTime.minutes()) / 5);
          
          for (let index = startIndex; index < endIndex; index++) {
            if (index >= 0 && index < dayData.length) {
              dayData[index].value = 1;
            }
          }
        }
      }
    }
    return [dayData, totalTime];
  }