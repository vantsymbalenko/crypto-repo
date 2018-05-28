export const getModalStatus = obj => {
  let a;
  Object.keys(obj).forEach(item => {
    a = a || obj[item];
  });
  return !!a;
};
