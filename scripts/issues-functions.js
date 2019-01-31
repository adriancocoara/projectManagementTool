// Get saved issues from local storage
const getSavedIssues = () => {
    const issuesJSON = localStorage.getItem('issues');

if (issuesJSON !== null) {
    return JSON.parse(issuesJSON);
} else {
    return [];
}};

// Save issues to local storage
const saveIssues = (issues) => {
    localStorage.setItem('issues', JSON.stringify(issues));
};

// Remove an issue from the list
const removeIssue = (id) => {
    const issIndex = issues.findIndex((issue) => {
        return issue.id === id;
    })

    if (issIndex > -1) {
        issues.splice(issIndex, 1);
    }
};

// Render issues
const renderIssues = (issues, filterIss) => {
    let filteredIssues = issues.filter((issue) => {
        return issue.ing.toLowerCase().includes(filterIss.searchIss.toLowerCase()) && issue.sprintId === filterIss.sprintId;
    })

    document.querySelector('#issues').innerHTML = '';
    
    filteredIssues.forEach((issue) => {
        document.querySelector('#issues').appendChild(generateIssDOM(issue));
    })
};

// Generate issues DOM
const generateIssDOM = (issue) => {
    const div = document.createElement('div');
    const issText = document.createElement('span');
    const removeButton = document.createElement('button');
    // Setup span text
    issText.textContent = issue.ing;
    div.appendChild(issText);

    // Setup the remove button
    removeButton.textContent = 'x';
    div.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeIssue(issue.id);
        saveIssues(issues);
        renderIssues(issues, filterIss);
    })

    return div;
};