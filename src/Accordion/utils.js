export const arrayify = obj => [].concat(obj);

export function getChildrenActiveItems(children) {
  const activeItems = [];

  arrayify(children)
    .filter(c => c)
    .forEach((children, index) => {
      if (!children.props.disabled && children.props.expanded) {
        activeItems.push(index);
      }
    });

  return activeItems;
}

export function getActiveItems(children, allowMultiple) {
  let activeItems = getChildrenActiveItems(children);

  if (!allowMultiple && activeItems.length > 0) {
    activeItems = activeItems.slice(0, 1);
  }

  return activeItems;
}

// https://stackoverflow.com/a/22395463/338762
export function isSame(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
}
