// Declare a new function named search
async function search() {
    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;
    // read the searchType
    let searchType = document.forms.searchForm.searchType.value;
    // empty the input field
    document.forms.searchForm.term.value = '';
    // read the json
    let rawData = await fetch('/api/images/' + searchTerm + '/' + searchType);
    // convert json to a javascript data structure
    let images = await rawData.json();
    // create an variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${images.length} images.</p>
    `;
    // loop through the found images
    for (let image of images) {
      let meta = image.metadata;
      html += `
        <section>
          <h2>${image.fileName}</h2>
          <a href="https://maps.google.com/?q=${image.metadata.latitude},${image.metadata.longitude}" target="_blank"><img src="/images/${image.fileName}"></a>
          <p><b>Source:</b> ${meta.FileSource}</p>
          <p><b>Picture Taken:</b> ${meta.CreateDate}</p>  
          <p><b>Longitude:</b> ${meta.longitude}</p>
          <p><b>Latitude:</b> ${meta.latitude}</p>
        </section>
      `;
    }
    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');
    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }