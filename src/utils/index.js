export const expandArray = len => {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(len + i + 1);
  }
  return arr;
};

export const determineGrid = item => {
  let styles = [];
  for (let i = 0; i < item.length; i++) {
    if (item[i + 1] && item[i].unit === item[i + 1].unit) {
      let j = i + 1;
      while (j < item.length && item[i].unit === item[j].unit) {
        j++;
      }
      styles.push(`repeat(${j - i}, ${item[i].unit})`);
      i += j - 1;
    } else {
      styles.push(item[i].unit);
    }
  }
  return styles.join(" ");
};
