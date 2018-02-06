function getSourceCode() { ///XỬ LÝ LẤY SOURCE CODE CỦA TRANG HIỆN TẠI ĐANG SỬ DỤNG EXTENSION. MỤC TIÊU LÀ TÌM RA LIÊN KẾT VIDEO TRONG ĐÓ.
    document.getElementById("url").innerHTML = window.location.href; 
    var url=x,xmlhttp;//Remember, same domain
    if("XMLHttpRequest" in window)
      xmlhttp = new XMLHttpRequest();
    if("ActiveXObject" in window)
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    xmlhttp.open('GET',url,true);
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
          var a = xmlhttp.responseText;  
          getLinkFB(a);
        }
    };
    xmlhttp.send();
}

function getLinkFB(a){
    var string = a;

    var stringNeed = "hd_src_no_ratelimit";

    if (string.indexOf(stringNeed) >=0) {/// CASE 1: TÌM CHẤT LƯỢNG HD VÀ SD. NẾU CÓ HD THÌ XỬ LÝ LẤY 2 LINK HD & SD Ở ĐÂY.

        var getHDlink = string.match('hd_src_no_ratelimit:"(.*)",aspect_ratio');
        var HD_link =  getHDlink[1];

        var getSDlink = string.match('sd_src_no_ratelimit:"(.*)",hd_src_no_ratelimit');
        var SD_link =  getSDlink[1];

        //Ở front-end của extension, hiển thị ra các tùy chọn cho người dùng bấm vào để lựa chọn HD hoặc SD để tải về.
        //Đoạn code giúp đổi tên và href của 2 thẻ <a> ở front-end để chứa link video cần tải.
        var tenHD="HD Video";
        var tenSD="SD Video";
        var links = document.getElementsByClassName('dynamicLink');
        for (var i = 0; i < links.length; i++) {
            links[i].href = HD_link;
            links[i].innerHTML = tenHD.replace();
        }
        var links1 = document.getElementsByClassName('dynamicLink1');
        for (var i = 0; i < links1.length; i++) {
            links1[i].href = SD_link;
            links1[i].innerHTML = tenSD.replace();
        }

    }
    else {/// CASE 2: VIDEO CHỈ REACH TỚI CHẤT LƯỢNG SD LÀ CAO NHẤT. 

        var getSDlink = string.match('sd_src_no_ratelimit:"(.*)",aspect_ratio');
        var SD_link =  getSDlink[1];

        var tenSD="SD Video";
        var links = document.getElementsByClassName('dynamicLink1');
        for (var i = 0; i < links.length; i++) {
            links[i].href = SD_link;
            links[i].innerHTML = tenSD.replace();
        }
    }
}
