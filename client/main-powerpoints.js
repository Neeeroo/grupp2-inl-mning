// Declare a new function named search
async function search() {
  // read the user input from the term field in the form searchForm
  let searchTerm = document.forms.searchForm.term.value;
  // read the searchType
  let searchType = document.forms.searchForm.searchType.value;
  console.log(searchType);
  // empty the input field
  document.forms.searchForm.term.value = '';
  // read the json
  let rawData = await fetch('/api/powerpoints/' + searchTerm + '/' + searchType);
  // convert json to a javascript data structure
  let powerpoints = await rawData.json();
  // create an variable name that initially is an empty string
  let html = `
    <p>Du sökte efter "${searchTerm}"...</p>
    <p>Hittade ${powerpoints.length} låtar.</p>
  `;
  // loop through the found information
  for (let powerpoint of powerpoints) {
    let meta = powerpoint.metadata;
    console.log(powerpoint.metadata);
    html += `
      <section>
        <h2>${meta.title}</h2>
        <p><b>Company:</b> ${meta.company}</p>
        <p><b>Date Created:</b> ${meta.creation_date}</p>  
        <p><b>Original Reference:</b> ${meta.original}</p>  
        <p>
        <a href="powerpoints/${powerpoint.fileName}">Download PowerPoint</a>
        </p>
      </section>
    `;
  }
  // Grab the element/tag with the class searchResults
  let searchResultsElement = document.querySelector('.searchResults');
  // Change the content of the searchResults element
  searchResultsElement.innerHTML = html;
}