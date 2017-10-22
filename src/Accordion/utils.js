export function getChildrenActiveItems(children) {
  let activeItems = [];

  (children || []).forEach((children, index) => {
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
