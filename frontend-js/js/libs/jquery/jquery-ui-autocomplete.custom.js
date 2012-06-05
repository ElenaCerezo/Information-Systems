$.ui.autocomplete.prototype._renderItem = function( ul, item) {
      var t = item.label;
      return $( "<li></li>" )
          .data( "item.autocomplete", item )
          .append( "<a>" + t + "</a>" )
          .appendTo( ul );
};