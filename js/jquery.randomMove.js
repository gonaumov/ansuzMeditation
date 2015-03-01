(function ($) {
    $.fn.randomMove = function (options) {
		var defaults = {
		    containerSelector: "body"
		};
		var settings = $.extend({}, defaults, options);
			
        return this.each(function handleCurrentElement() {			
            var currentElement = $(this);
            var index = currentElement.data("indexIteration");
                    
            if(typeof index === 'undefined' && typeof $.fn.randomMove.iterarionNumber === 'undefined') {
				 $.fn.randomMove.iterarionNumber = 0;
				 index = 0;
				 currentElement.data("indexIteration",0);
			} else if(typeof index === 'undefined') {
				 index = ++$.fn.randomMove.iterarionNumber;
				 currentElement.data("indexIteration",index);
			}
			
            var classSelector = "prclickImage"  + index.toString();
            var cssIdSelector = "iposition" + index.toString();
            var position = currentElement.offset(); // position = { left:; number, top: number }
            var oxPosition = position.left;
            var oyPosition = position.top;

            var randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            
            var container = $(settings.containerSelector);

            var yPosition = randomIntFromInterval((container.offset()).top, (container.height() - currentElement.height()));
            var xPosition = randomIntFromInterval((container.offset()).left, (container.width() - currentElement.width()));

            var positionAndClassContent = [
               "@keyframes " + classSelector + " {",
                "from {",
                "top:" + oyPosition + "px;",
                "left:" + oxPosition + "px;",
                "}",
                "to {",
                "top:" + yPosition + "px;",
                "left:" + xPosition + "px;",
                "}",
                "}",
                "@-webkit-keyframes " + classSelector + " {",
                "from {",
                "top:" + oyPosition + "px;",
                "left:" + oxPosition + "px;",
                "}",
                "to {",
                "top:" + yPosition + "px;",
                "left:" + xPosition + "px;",
                "} }",
               "." + classSelector + " {",
                "display: block;",
                "animation: " + classSelector + " 4s;",
                "-webkit-animation: " + classSelector + " 4s; }"
            ].join("\n");

            currentElement.removeClass(classSelector);

            $("<style/>", {
                type: "text/css",
                id: cssIdSelector,
                html: positionAndClassContent
            }).appendTo("body");

            currentElement.one("animationend webkitAnimationEnd oAnimationEnd", function (event) {
                $("#" + cssIdSelector).remove();
                $(this).css({
                    left: xPosition + "px",
                    top: yPosition + "px"
                });
                setTimeout(function () {
                    handleCurrentElement.call(this);
                }.bind(this), 500);
            });

            currentElement.addClass(classSelector);
        });
    };
}(jQuery));
