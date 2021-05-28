//Back To Top
    //Get the button
    var mybutton = document.getElementById("myBtn");

    function progressBarPorcent() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
        document.getElementById("myBar").style.background = "#CA0000";
    };


    function scrollButtonAppear() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function goToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollButtonAppear();
        progressBarPorcent();
    };