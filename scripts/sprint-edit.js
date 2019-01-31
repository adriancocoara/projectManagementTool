const titleEl = document.querySelector('#sprint-name');
const bodyEl = document.querySelector('#sprint-body');
const removeEl = document.querySelector('#remove-sprint');
const dateElement = document.querySelector('#last-edited');
const sprintId = location.hash.substring(1);

const sprints = getSavedSprints();

let sprint = sprints.find((sprint) => {
    return sprint.id === sprintId;
});

if (sprint === undefined) {
    location.assign('/index.html');
}

titleEl.value = sprint.title;
bodyEl.value = sprint.body;
dateElement.textContent = generateLastEdited(sprint.updatedAt);

// Fill the sprint name text
titleEl.addEventListener('input', (e) => {
    sprint.title = e.target.value;
    sprint.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(sprint.updatedAt);
    saveSprints(sprints);
})

// Fill the sprint comment text
bodyEl.addEventListener('input', (e) => {
    sprint.body = e.target.value;
    sprint.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(sprint.updatedAt);
    saveSprints(sprints);
})

// Remove sprint from the edit page
removeEl.addEventListener('click', (e) => {
    removeSprint(sprint.id);
    saveSprints(sprints);
    location.assign('/index.html');
})