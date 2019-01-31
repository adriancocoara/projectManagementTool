// Read existing sprints from localStorage
const getSavedSprints = () => {
    sprintsJSON = localStorage.getItem('sprints');

if (sprintsJSON !== null) {
    return JSON.parse(sprintsJSON);
} else {
    return [];
}
};

// Save the sprints to localStorage
const saveSprints = (sprints) => {
    localStorage.setItem('sprints', JSON.stringify(sprints));
};

// Remove a sprint from the list
const removeSprint = (id) => {
    const sprintIndex = sprints.findIndex((sprint) => {
        return sprint.id === id;
    })

    if(sprintIndex > -1) {
        sprints.splice(sprintIndex, 1);
    }
};

// Generate the DOM structure for a sprint
const generateSprints = (sprint) => {
    const sprintEl = document.createElement('div');
    const textEl = document.createElement('a');
    const buttonEl = document.createElement('button');

        // Setup the remove sprints button
        buttonEl.textContent = 'x';
        sprintEl.appendChild(buttonEl);
        buttonEl.addEventListener('click', () => {
            removeSprint(sprint.id);
            saveSprints(sprints);
            renderSprints(sprints, filters);
        })

        //Setup the sprint title text
        if (sprint.title.length > 0) {
            textEl.textContent = sprint.title;
        } else {
            textEl.textContent = 'Unnamed sprint';
        }

        textEl.setAttribute('href', `/edit.html#${sprint.id}`);
        sprintEl.appendChild(textEl);
        return sprintEl;

};

// Sort your sprints by one of three ways
const sortSprints = (sprints, sortBy) => {
    if (sortBy === 'byEdited') {
        return sprints.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return sprints.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical') {
        return sprints.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if ( a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return sprints;
    }
};

// Rendering sprints
const renderSprints = (sprints, filters) => {
    sprints = sortSprints(sprints, filters.sortBy);
    const filteredSprints = sprints.filter((sprint) => {
        return sprint.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    document.querySelector('#sprints').innerHTML = ''
    
    filteredSprints.forEach((sprint) => {
        const sprintEl = generateSprints(sprint);
        document.querySelector('#sprints').appendChild(sprintEl);
    })
};

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`;
};