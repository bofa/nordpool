import axios from 'axios'
import { Range } from 'immutable'
import Moment from 'moment'
import writeJsonFile from 'write-json-file';

const dayToSec = 24*60*60*1000
const yearToSec = 365*24*60*60*1000
const now = Date.now()

function apiCall(time, delay = 20000) {
  const call = () => axios.get('https://www.nordpoolgroup.com/api/marketdata/page/29?currency=,EUR,EUR,EUR&endDate='
    + Moment(time).format('DD-MM-YYYY'))

  return new Promise((resolve, reject) => {
    setTimeout(() => call().then(resolve, reject), delay);
  });
}

const range = Range(now - 2*yearToSec, now, dayToSec)
// const range = Range(now - 20*dayToSec, now, dayToSec)
  .map((time, index, range) => apiCall(time, 300*index).then(response => response.data.data.Rows)
    .then(data => data.map(hour => ({
      StartTime: hour.StartTime,
      "SE1": hour.Columns[0].Value,
      "SE2": hour.Columns[1].Value,
      "SE3": hour.Columns[2].Value,
      "SE4": hour.Columns[3].Value
    }), () => 'error'))
    .then(formated => {
      if(index % 10 === 0) {
        console.log(index, Math.round(100 * index/range.size) + '%', Moment(time));
      }
      return formated
    })
  )

Promise.all(range)
  .then(response => writeJsonFile('scrape/raw.json', response.flatten()))
  .then(() => console.log('done scrape'))
