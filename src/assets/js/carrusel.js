$(document).ready(function () {
    if ($(".container_carru").html() != null) {
        var objects = $(".container_carru #items img");
        var items = $(".container_carru #items img").length - 1;
        var i = 0;
        $(".container_carru #items img").each(function (index) {
            if (i == 0) {
                $(this).addClass('img_left');
            } else if (i == 1) {
                $(this).addClass('img_center');
            } else if (i == 2) {
                $(this).addClass('img_rigth');
            };
            i++;
        });
        var dataimg_Cen = 1;
        $("#arrowleft").on("click", function (event) {
            $(".container_carru #items img").attr('class', '');
            if (dataimg_Cen == 0) {
                dataimg_left = items;
            } else {
                dataimg_left = dataimg_Cen - 1;
            };
            if (dataimg_left == 0) {
                dataimg_rigth = items;
            } else {
                dataimg_rigth = dataimg_left - 1;
            };
            //center
            img_center = $(objects[dataimg_Cen]);
            img_center.addClass('animaterigthR');
            img_center.addClass("img_rigth");
            //left 
            img_left = $(objects[dataimg_left]);
            img_left.addClass("animaterigthC");
            img_left.addClass("img_center");
            //rigght
            img_rigth = $(objects[dataimg_rigth]);
            img_rigth.addClass("animaterigthL");
            img_rigth.addClass("img_left");
            if (dataimg_Cen == 0) {
                dataimg_Cen = items;
            } else {
                dataimg_Cen = dataimg_Cen - 1;
            };
        });
        //izquierdo
        $("#arrowrigth").on("click", function (event) {
            $(".container_carru #items img").attr('class', '');
            if (dataimg_Cen == items) {
                dataimg_rigth = 0;
            } else {
                dataimg_rigth = dataimg_Cen + 1;
            };
            if (dataimg_rigth == items) {
                dataimg_left = 0;
            } else {
                dataimg_left = dataimg_rigth + 1;
            };
            //center
            img_center = $(objects[dataimg_Cen]);
            img_center.addClass('animateleftL');
            img_center.addClass("img_left");
            // //  //left 
            img_left = $(objects[dataimg_left]);
            img_left.addClass("animateleftR");
            img_left.addClass("img_rigth");
            // // // //rigght
            img_rigth = $(objects[dataimg_rigth]);
            img_rigth.addClass("animateleftC");
            img_rigth.addClass("img_center");
            //
            if (dataimg_Cen == items) {
                dataimg_Cen = 0;
            } else {
                dataimg_Cen = dataimg_Cen + 1;
            };
        });
        //sweet
        var myElement = document.getElementsByClassName('container_carru')[0];
        var mc = new Hammer(myElement);
        mc.on("swipeleft", function (ev) {
            $("#arrowrigth").trigger("click");
        });
        mc.on("swiperight", function (ev) {
            $("#arrowleft").trigger("click");
        });
    }
});