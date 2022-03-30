const useConverter = (num: number) => {
  let amount = num;
  const length = amount.toString().length;
  if (length <= 6) {
    return amount.toString();
  }
  if (length === 7) {
    const first = amount.toString().substring(0, 1);
    const second = amount.toString().substring(1);
    return first + "," + second;
  }
  if (length === 8) {
    const first = amount.toString().substring(0, 2);
    const second = amount.toString().substring(2);
    return first + "," + second;
  }
  if (length === 9) {
    const first = amount.toString().substring(0, 3);
    const second = amount.toString().substring(3);
    return first + "," + second;
  }
  if (length === 10) {
    const first = amount.toString().substring(0, 1);
    const second = amount.toString().substring(1, 4);
    const third = amount.toString().substring(4);
    return first + "," + second + "," + third;
  }
  if (length === 11) {
    const first = amount.toString().substring(0, 2);
    const second = amount.toString().substring(2, 5);
    const third = amount.toString().substring(5);
    return first + "," + second + "," + third;
  }
  if (length === 12) {
    const first = amount.toString().substring(0, 3);
    const second = amount.toString().substring(3, 6);
    const third = amount.toString().substring(6);
    return first + "," + second + "," + third;
  }
  if (length === 13) {
    const first = amount.toString().substring(0, 1);
    const second = amount.toString().substring(1, 4);
    const third = amount.toString().substring(4, 7);
    const fourth = amount.toString().substring(7);
    return first + "," + second + "," + third + "," + fourth;
  }
};

export default useConverter;
