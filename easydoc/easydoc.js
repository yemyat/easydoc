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
        li += "<a href='#"+$(this).text()+inc+"'><li>"+$(this).text()+"</li>";
        $(this).before("<a name='"+$(this).text()+inc+"'></a>");
        inc++;
        li +=rec(this,1,arr);
    });
    li +="</ul>";

    $("#toc").append(li);
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
            console.log('false');
            return false;
        }
        li += "<a href='#"+$(this).text()+inc+"'><li>"+$(this).text()+"</li>";
        $(this).before("<a name='"+$(this).text()+inc+"'></a>");
        inc++;

        li +=rec(this,current+1,array);
        
    });
    li +="</ul>";
    return li;
}