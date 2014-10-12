$(document).ready(function() {
  var wid = $('body > .container').width() / 6, $images = $('#images');
  $images.masonry({
    itemSelector: 'img',
    gutter: 0,
    columnWidth: wid
  });
  $('#images').on('start', function(e, tag){
  $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {tags: tag, format: "json"})
  .done(function( data ) {
    var elems, ratio, normal, elem;
      $.each( data.items, function( i, item ) {
        normal = item.media.m.substring(0, item.media.m.lastIndexOf('_')) + item.media.m.substring(item.media.m.lastIndexOf('_') + 2);
        elem = $(item.description).find('img').parent().html();
        ratio = $(elem).attr('width') / $(elem).attr('height');
        elem = $(elem).attr({'data-content': normal, 'width': wid, 'height': (wid / ratio)}).airview({width: 350, placement: 'auto top'});
        elems = elems ? elems.add( elem ) : elem;
      });
      $images.prepend(elems).masonry('prepended', elems);
    });
  });
  $('#images').trigger('start', 'summer');
  $('#tags').on('click', function(e) {
    e.preventDefault();
    $('#images').trigger('start', $('#taginput').val());
  });
});