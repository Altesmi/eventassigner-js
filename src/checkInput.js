const checkInput = (input) => {
  if ((typeof (input.events)) === 'undefined') {
    return 0;
  }
  return 1;
};

module.exports = { checkInput };
