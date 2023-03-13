function loadBooks() {

    $(".list").empty();

    $.get("/api/books", function (response) {

        for (const book of response) {
            $(".list").append("<li>" + book.id + ": " + book.title + " by " + book.author + "</li>")
        }
    });
}

$(document).ready(function () {

    // Call this function when the open is opened
    loadBooks();

    $("form").submit(function () {

        const data = {
            author: $("#author").val(),
            title: $("#title").val()
        }

        $.post("/api/books/create", data, function (response) {
            loadBooks();
            console.log("Done");
        });

        return false;
    })
});
