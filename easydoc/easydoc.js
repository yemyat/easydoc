var inc = 1;


$(document).ready(function(){

    var md = $("#content").html();
    var converter = new Showdown.converter();
    var html = converter.makeHtml(md);
    $("#content").html(html);
    hljs.initHighlightingOnLoad();

    var arr = ["H1","H2","H3","H4","H5","H6"];

    var li = "<ul>";
    $("H1").each(function(){
        li += "<li><a href='#"+$(this).text().replace(/ /g,"")+inc+"'>"+$(this).text()+"</a></li>";
        // $(this).before("<a name='"+$(this).text()+inc+"'></a>");
        $(this).attr("id",$(this).text().replace(/ /g,"")+inc);
        inc++;
        li +=rec(this,1,arr);
    });
    li +="</ul>";

    $("#toc").append(li);



    //scroll spy
    // Cache selectors
    var lastId,
        topMenu = $("#toc"),
       // topMenuHeight = topMenu.outerHeight()+50,
       topMenuHeight = 0;
        // All list items
        menuItems = topMenu.find("a");
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

        

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        
      var href = $(this).attr("href");
      console.log(href);
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems.parent().removeClass("active");
          menuItems.filter("[href=#"+id+"]").parent().addClass("active");
          
       }                   
    });

});

function rec(node,current,array)
{
    if(current==array.length)
    {
        return "";
    }

    var li = "<ul>";
    
    $(node).nextAll(array[current-1]+","+ array[current]).each(function(){
        if($(this).prop('tagName')==array[current-1])
        {
            
            return false;
        }
         li += "<li><a href='#"+$(this).text().replace(/ /g,"")+inc+"'>"+$(this).text()+"</a></li>";
        //$(this).before("<a name='"+$(this).text()+inc+"'></a>");
        $(this).attr("id",$(this).text().replace(/ /g,"")+inc);
        inc++;

        li +=rec(this,current+1,array);
        
    });
    li +="</ul>";
    return li;
}


