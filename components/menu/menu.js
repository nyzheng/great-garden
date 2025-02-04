
; (function (document) {
    
    window.addEventListener("load", JSfn, false);

    function JSfn() {
        let srcs = [];
        let tag = document.querySelectorAll("nav > .menu > li > a");
        let tagActive = [];
        
        for (let item of tag) {
            if (item.href !== "" && (item.classList.contains("lang-box") || item.href !== "javascript:;") && item.nextElementSibling) {
                tagActive.push(item);
                srcs.push({ Name: item.innerText, Link: item.href, Listener: false });
                item.classList.add("down");
            }
        }
        
        function active(event) {
            event.preventDefault(); // 取消預設觸發行為
            event.stopPropagation(); // 終止冒泡事件

            const params = event.target._params;

            srcs.find(x => x.Name === params.tag.innerText).Listener = true;

            if (this.classList.contains("menu-open")) {
                this.classList.remove("menu-open");
                this.nextElementSibling && (this.nextElementSibling.style.maxHeight = "");
            } else {
                for (let item of tagActive) {
                    item.classList.remove("menu-open");
                    item.nextElementSibling && (item.nextElementSibling.style.maxHeight = "");
                }

                this.classList.add("menu-open");
                this.nextElementSibling && (this.nextElementSibling.style.cssText = `max-height: ${this.nextElementSibling.scrollHeight}px;`);
            }
        }

        function ClickHandles() {
            for (let item of tagActive) {
                item.href = "javascript:;";
                if (!srcs.find(x => x.Name === item.innerText).Listener) {
                    item._params = { tag: item };
                    item.addEventListener("touchstart", active, false); // touchstart 手機板 點擊事件
                }
            }
        };

        (document.body.offsetWidth <= 767) && ClickHandles(); // 手機板

        window.addEventListener("resize", function (event) {
            event.preventDefault(); // 取消預設觸發行為
            event.stopPropagation(); // 終止冒泡事件

            if (document.body.offsetWidth <= 767) {
                ClickHandles();
            } else {
                for (let item of tagActive) {
                    item.href = srcs.find(x => x.Name === item.innerText).Link;
                    if (srcs.find(x => x.Name === item.innerText).Listener) {
                        item.removeEventListener("click", active);
                        srcs.find(x => x.Name === item.innerText).Listener = false;
                    }
                }
            }
        }, true);
    }
})(document)