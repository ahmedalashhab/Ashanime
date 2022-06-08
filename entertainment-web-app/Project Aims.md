My Aims with this project.

1. Create an interactive page that displays the following:
   1. Top anime
   2. Trending anime
   3. trailers for each anime
   4. Bookmarked anime
   5. Search for anime
   6. Add/Remove bookmarks
   7. sort/filter through anime

2. The api for this project will be the MAL api.
3. In regard to trailers, I will be using YouTube api.
   1. This will be done by sending the request for a video to the youtube api and adding
        the name of the anime (from the MAL api) to the search term of the video to the YouTueb api request
        which will also add the word "trailer" to the end of each anime name.
   2. The first video will then be fetched from the YouTube api and displayed on a modal.
4. user accounts will be handled using the Gauth platform.
5. Local storage will be used to store bookmarks.


[]: # Language: markdown
[]: # Path: entertainment-web-app/starter-code/index.js