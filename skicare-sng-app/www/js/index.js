var baseUrl = location.href.replace("/index.html", "");
var contentType = 'application/pdf';
var options = {};

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
        var height = (skicar.height / maxHeight) * 100;
        $a.css("height", height + '%');
        $a.click(createDocumentOpener(skicar.file));

        var listItem = '';
        listItem += '<span class="big">#'+(index+1)+'</span><br>' +
                    '<img src="'+ skicar.preview +'" class="img-responsive">' + // './assets/SVK_SNG.K_2012.jpeg'
                    '<span class="title">'+skicar.title+'</span>';
        $a.append(listItem);
        $(listId).append($a);
      });
    });

}

function createDocumentOpener(file)
{
    return function ()
    {
        return viewDocument(file)
    };
}

function viewDocument(url)
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
            },
            function ()
            {
                // closed
                window.console.log('document closed');
            }
    );
    return false;
}    

app.initialize();