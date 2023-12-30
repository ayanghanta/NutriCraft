import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = fetch(url);
    const resp = await Promise.race([res, timeout(TIMEOUT_SEC)]);
    if (!resp.ok) throw Error('ERROR IN API');
    const jsonData = await resp.json();
    return jsonData;
  } catch (err) {
    throw err;
  }
};
