let sprints = getSavedSprints();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

renderSprints(sprints, filters);

// Add a new sprint to the list
document.querySelector('#add-sprint').addEventListener('click' , (e) => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    sprints.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    });
    saveSprints(sprints);
    location.assign(`/edit.html#${id}`);
});

// Filter through sprints
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderSprints(sprints, filters);
});

// Sort by
document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderSprints(sprints, filters);
});

