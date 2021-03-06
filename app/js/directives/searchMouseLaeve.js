app.directive('thumbnail', function($document,$window) {
  return {
    restrict: 'CA',
    link: function(scope,element, attr) {
        $document.on('click', function (e) {
           if (element !== e.target 
                && !element[0].contains(e.target) 
                && element[0].attributes['data-t'].value == 0) {
                $(element).attr("data-t",1);
                $(element).hide();
                scope.searchTerm = "";
                $("#searchBar").value = "";
            }
       });
    }
  }
});
