/**
 * Created by PyCharm.
 * User: hepochen
 * Date: 11-9-28
 * Time: 下午3:52
 * To change this template use File | Settings | File Templates.
 *
 */

var $random = function (u,i){return Math.floor(Math.random()*(i-u+1)+u)}


var yes_no = function(){
    return Math.random()>0.5
}







function split_images(images){
    if (images.length ==1) { /* 自动补全 */
        images.include(images[0].clone())
    }

    var line_num = $random(2,7);
    if (line_num > images.length){
        line_num = images.length;
    }

    var to_return = [];
    var grid = [];
    for (var i=0;i<images.length;i++){
        grid.include(images[i]);
        if (grid.length==line_num){
            to_return.include(grid);
            line_num = $random(2,7);
            grid = [];
        }
    }

    //最后一个grid还没有进入到grids中
    var last = grid;
    if (last.length in [0,1]){
        to_return.getLast().append(last);//合并到最后一个grid
    }
    else{
        to_return.include(grid);//作为一个独立的grid添加
    }

    return to_return


}

function split_row(row){
    var split = {//单行分割为两个grid
        2:[1,1],
        3:[[1,2],[2,1]].getRandom(),
        4:[[1,3],[3,1],[2,2]].getRandom(),
        5:[[1,4],[4,1],[3,2],[2,3]].getRandom(),
        6:[[3,3],[2,4],[4,2]].getRandom(),
        7:[[3,4],[4,3]].getRandom(),
        8:[4,4]
    }[row.length];
    var grid1=[],grid2=[];
    row.each(function(image,index){
        if (index<split[0]){
            grid1.include(image)
        }
        else{
            grid2.include(image)
        }
    });
    return [grid1,grid2]

}

function get_grids(){
    var grids = [];
    var rows = split_images($$('#grids .image'));
    rows.each(function(row){
        grids.append(split_row(row));

    });
    return grids

}

function product(){
    var grid_container = $('grids');
    var grids = get_grids();
    grids.each(function(grid){
        var grid_dom = new Element('div.grid');
        grid_container.adopt(grid_dom);
        var classes={
            1:['gfull'],
            2:['g13','g24'],
            3:yes_no()?['g13','g2','g4']:['g1','g3','g24'],
            4:['g1','g2','g3','g4']
        }[grid.length];
        grid.each(function(image,index){
            image.addClass(classes[index]);
            //image.getElement('img').setStyles({'width':image.getWidth()});
            grid_dom.adopt(image);


        });

    });
    grid_container.adopt(new Element('div.clear'));
}


document.addEvent('domready',function(){
    product();
});


