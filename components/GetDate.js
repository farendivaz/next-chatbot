export default function CurrentDate() {
    const lastUpdated = new Date(document.lastModified);
    const dayName = lastUpdated.getDay();
    const weekDaysArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const currentDate = weekDaysArr[dayName] + ', ' 
      + lastUpdated.getDate()        + '/' 
      + (lastUpdated.getMonth() + 1) + '/' 
      + lastUpdated.getFullYear()    + ', ' 
      + lastUpdated.getHours()       + ':' 
      + lastUpdated.getMinutes()     + ':' 
      + lastUpdated.getSeconds();
    return currentDate;
}