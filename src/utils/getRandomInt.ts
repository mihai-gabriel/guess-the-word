// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomNumbersGenerator = (min: number, max: number) => {
  let generated: number[] = [];

  return function (count: number) {
    while (generated.length < count) {
      let randomNumber = getRandomInt(min, max);

      if (!generated.includes(randomNumber)) {
        generated.push(randomNumber);
      }
    }

    return generated;
  };
};
