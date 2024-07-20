// function to add st rd and so on to 2 digit string rep of day
const appendDay =  function(day) {
    const dayArr = day.split('');
    const last = dayArr[dayArr.length-1];
    let answer = '';
    // the funky 11-12-13th s ELSE run the switch
    if(day === 11 || day === 12 || day === 13) {
      answer = 'th';
    } else {
      switch (last) {
        case '1': 
          answer = 'st';
          break;
        case '2':
          answer = 'nd';
          break;
        case '3':
          answer = 'rd';
          break;
        default:
          answer = 'th';
      }
    }
    return (dayArr[0] === '0') ? `${dayArr[1]}${answer}` : `${day}${answer}`;
  
  }
  
  // parse a YYYY-MM-DD date format into readable american style date
  export const parseDate = (d) => {
    let arr = d.split('-');
    //console.log('check the split', arr)
    
    // object table for month conversion
    const num2date = {
      '01': 'January',
      '02': 'Feburary',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    const formatDay = appendDay(arr[2]);
    return `${num2date[ arr[1] ]} ${formatDay} ${arr[0]}`;
  }

  export function parseTime(str) {
    const negMod = (num, modd) => {
      return ((num % modd) + modd) % modd;
    }
    let newStr = '';
    if(str[0] === '0') {
      // get rid of the leading 0
      newStr = str.slice(1);
    } else {
      newStr = str;
    }
    const timeArr = newStr.split(':');
    const hourShift = negMod((parseInt(timeArr[0]) - 4), 24);
    return `${hourShift}:${timeArr[1]}`;
  }
      
  // convert underscore names into spaces
  export function removeUnderscores(str) {
    return str.replace(/_/g, ' ').toUpperCase();
    
  }
  
  // convert mongo update and create at time into readable date
  export const parseMongoDate = (str) => {
    if(typeof str === 'string') {

        const slicedDate = str.slice(0,10);
        const slicedTime = str.slice(11,16);
        return `${parseDate(slicedDate)} ${parseTime(slicedTime)}`;
    }
  }