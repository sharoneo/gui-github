
const fn = require('./fn');

/* test('a :200 b:127，sum:327.-', () => {
  const a = 200;  // a---
  const b = 127; // b---

  // success ~~
  expect(fn.add(a, b)).toBe(327);
}); */

test('get config data ===', () => {
  //expect.assertions(1);

  // The assertion for a promise must be returned.
  return fn.fetchData(1).then(data => {
    //console.log("data=",JSON.stringify(data));
    //console.log("addr=",data.status['lan_status'].addr);
    console.log("data.status toBeDefined");
    expect(data.status).toBeDefined();
    //expect(data.status['lan_status'].addr).toEqual('192.168.1.1');
  })
});