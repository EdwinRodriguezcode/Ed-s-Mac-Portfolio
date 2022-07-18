

console.log('home js has loaded')
$.get('/friends').then(function(data) {
    console.log(data);
    $('#numEntries').text(data.length)
})