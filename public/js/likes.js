$(document).ready(function () {
  const artistContainer = $("#likelist-Artist");
  const trackContainer = $("#likelist-Tracks");
  const bookContainer = $("#likelist-Books");
  // Getting artists, tracks, and books from database when page loads
  getArtists();
  getTracks();
  getBooks();
  // This function grabs all artists from the database and renders to page
  function getArtists() {
    $.get("/api/artists", function (data) {
      artists = data;
      artistContainer.empty();
      if (artists.length === 0) {
        const noArtistsMessage = $("<p>");
        noArtistsMessage.text("No liked artists yet...");
        artistContainer.append(noArtistsMessage);
      }
      if (artists.length !== 0) {
        for (let i = 0; i < artists.length; i++) {
          const row = $("<li>");
          row.addClass("list-group-item artistResult");
          row.text(artists[i].name);
          const artistDeleteBtn = $("<button>");
          artistDeleteBtn.addClass("badge badge-info deleteArtist");
          artistDeleteBtn.attr("data-artistId", artists[i].id);
          artistDeleteBtn.text("remove");
          row.append(artistDeleteBtn);
          artistContainer.prepend(row);
        }
      }
    });
  }
  artistContainer.on("click", $(".artistResult"), function (event) {
    event.stopPropagation();
    //how do we want to display this? 
  });
  // This function resets the artists displayed with new artists from the database and displays artists
  artistContainer.on("click", $(".deleteArtist"), function (event) {
    event.stopPropagation();
    const id = event.target.getAttribute("data-artistId");
    $.ajax({
      url: "/api/artists/" + id,
      type: "DELETE",
      success: function () {
      }
    }).then(getArtists);
  });
  //////////////////////////////////////////////////////////////Tracks
  function getTracks() {
    $.get("/api/tracks", function (data) {
      tracks = data;
      trackContainer.empty();
      if (tracks.length === 0) {
        const noTracksMessage = $("<p>");
        noTracksMessage.text("No liked tracks yet...");
        trackContainer.append(noTracksMessage);
      }
      if (tracks.length !== 0) {
        for (let i = 0; i < tracks.length; i++) {
          const row = $("<li>");
          row.addClass("list-group-item trackResult");
          row.text(tracks[i].name);
          const trackDeleteBtn = $("<button>");
          trackDeleteBtn.addClass("badge badge-info deleteTrack");
          trackDeleteBtn.attr("data-trackId", tracks[i].id);
          trackDeleteBtn.text("remove");
          const playBtn = $("<button>");
          playBtn.addClass("badge badge-success");
          playBtn.text("Play");
          row.append(playBtn);
          row.append(trackDeleteBtn);
          trackContainer.prepend(row);
        }
      }
    });
  }
  trackContainer.on("click", $(".trackResult"), function(event) {
    event.stopPropagation();
    //how do we want to display this? normally it would just be played... no point in rerunnning the search... only to show the same track name they alreay liked
  });
  // This function resets the artists displayed with new artists from the database and displays artists
  trackContainer.on("click", $(".deleteTrack"), function (event) {
    event.stopPropagation();
    const id = event.target.getAttribute("data-trackid");
    $.ajax({
      url: "/api/tracks/" + id,
      type: "DELETE",
      success: function () {
      }
    }).then(getTracks);
  });
  /////////////////////////////////////////////////////////////////////Books
  function getBooks() {
    $.get("/api/books", function (data) {
      books = data;
      bookContainer.empty();
      if (books.length === 0) {
        const noBooksMessage = $("<p>");
        noBooksMessage.text("No liked books yet...");
        bookContainer.append(noBooksMessage);
      }
      if (books.length !== 0) {
        for (let i = 0; i < books.length; i++) {
          const row = $("<li>");
          const link = $("<a>");
          row.addClass("list-group-item bookResult");
          link.attr("href", "https://books.google.com/books?id=" + books[i].title);
          link.attr("target", "_blank");
          link.text(books[i].title);
          const bookDeleteBtn = $("<button>");
          bookDeleteBtn.addClass("badge badge-info deleteBook");
          bookDeleteBtn.attr("data-bookId", books[i].id);
          bookDeleteBtn.text("remove");
          row.append(link);
          row.append(bookDeleteBtn);
          bookContainer.prepend(row);
        }
      }
    });
  }
  // This function resets the books displayed with new books from the database and displays the books
  bookContainer.on("click", $(".deleteBook"), function (event) {
    event.stopPropagation();
    const id = event.target.getAttribute("data-bookId");
    $.ajax({
      url: "/api/books/" + id,
      type: "DELETE",
      success: function () {
      }
    }).then(getBooks);
  });
});