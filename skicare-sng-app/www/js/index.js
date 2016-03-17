var baseUrl = location.href.replace("/index.html", "");
var contentType = 'application/pdf';
var options = {};
var media;

function buildAssetsUrl(file)
{
    return baseUrl + "/" + file;
}

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        $('body').addClass('initialized');
        StatusBar.hide();
        createList("skicare.json", "#skicare");
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};


function createList(sourceFile, listId) {

    $.getJSON(sourceFile, function(data) {         
      
      var maxHeight = Math.max.apply(Math,data.map(function(o){return o.height;}));
      
      $.each(data, function(index, skicar){

        var $a = $('<a></a>');
        $a.attr('href', '#');
        $a.addClass('skicar');
        var height = (skicar.height / maxHeight) * 85;
        $a.css("height", height + '%');
        $a.click(createDocumentOpener('sketchbooks/' + skicar.file, skicar.sound));

        var listItem = '';
        listItem += '<span class="big">#'+(index+1)+'</span><br>' +
                    '<img src="assets/'+ skicar.preview +'" class="img-responsive">' + // './assets/SVK_SNG.K_2012.jpeg'
                    '<span class="title">'+skicar.title+'</span>';
        $a.append(listItem);
        $(listId).append($a);
      });
    });

}

function createDocumentOpener(file, sound)
{
    return function ()
    {
        return viewDocument(file, sound)
    };
}

function viewDocument(url, sound)
{
    window.console.log("Attempting to view '" + url + "'");

    SitewaertsDocumentViewer.viewDocument(
            url,
            contentType,
            options,
            function ()
            {
                // shown
                window.console.log('document shown');
                media = new Media( "/sounds/"+sound, function() {
                        console.log('Media file readed succesfully');
                     },
                     function(error) {
                        console.log('Unable to read the media file.');
                     }
                );
                media.play({ numberOfLoops: 10 });

            },
            function ()
            {
                // closed
                window.console.log('document closed');
                media.stop();
                media.release();
                media = null;
            }
    );
    return false;
}    

app.initialize();