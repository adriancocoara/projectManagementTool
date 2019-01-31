let issues= getSavedIssues();

const filterIss = {
    searchIss: '',
    sprintId: location.hash.substring(1)
};

renderIssues(issues, filterIss);

document.querySelector('#add-issue').addEventListener('submit', (e) => {
    const id = uuidv4();
    e.preventDefault();
    issues.push({
        id: id,
        sprintId: location.hash.substring(1),
        ing: e.target.elements.firstIssue.value
    });
    saveIssues(issues);
    renderIssues(issues, filterIss);
    e.target.elements.firstIssue.value = '';
});

document.querySelector('#search-issues').addEventListener('input', (e) => {
    filterIss.searchIss = e.target.value;
    renderIssues(issues, filterIss);
});