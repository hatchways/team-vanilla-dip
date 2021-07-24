/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from 'moment';

const createDate = (date, time, timeZone) => {
  const getDate = date.format('ddd MMM DD YYYY');
  const getTime = time.format('HH:mm:ss');
  const getTimeZone = `GMT${moment.tz(timeZone).format('ZZ')}`;
  const finalDate = new Date(`${getDate} ${getTime} ${getTimeZone}`);
  return finalDate;
};

export default createDate;
