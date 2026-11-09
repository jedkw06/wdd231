function filterItems(category) {
    const container = document.getElementById('itemContainer');
  const items = Array.from(container.getElementsByClassName('item'));

  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block'; // Or 'flex' / 'grid' depending on your CSS layout
    } else {
      item.style.display = 'none';
    }
  });

  // 2. SORT: Keep the visible items perfectly sorted alphabetically/numerically (A-Z)
  items.sort((a, b) => {
    const nameA = a.getAttribute('data-name').toLowerCase();
    const nameB = b.getAttribute('data-name').toLowerCase();
    return nameA.localeCompare(nameB);
  });
}