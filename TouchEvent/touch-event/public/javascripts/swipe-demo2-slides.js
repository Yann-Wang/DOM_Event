/**
 * Created by a_wav on 2016/11/13.
 */
function $(selector) {
    return document.querySelector(selector);
}

window.saw = (function($){

    var TRANSITION     = 'transition',
        TRANSFORM      = 'transform',
        TRANSITION_END = 'transitionend',
        TRANSFORM_CSS  = 'transform',
        TRANSITION_CSS = 'transition';

    if(typeof document.body.style.webkitTransform !== undefined) {
        TRANSITION = 'webkitTransition';
        TRANSFORM = 'webkitTransform';
        TRANSITION_END = 'webkitTransitionEnd';
        TRANSFORM_CSS = '-webkit-transform';
        TRANSITION_CSS = '-webkit-transition';
    }

    var wrapperTemplate = function(){
        var div = document.createElement('div');
        div.innerHTML = '<div class="controls">'+
            '<a class="prev" href="#">prev</a> | '+
            '<a class="next" href="#">next</a></div>'+
            '</div>';
        div.className = "slidewrap";
        return div;
    };

    function slideTemplate(slide){
        var div = document.createElement('div');
        div.className = 'slide';
        div.innerHTML = '<div style="background-image:url('+slide.url+')">'+
            '<div class="caption"><a class="flickr-link" href="'+slide.link+'">By '+slide.owner+' on Flickr</a></div>'+
            '</div>';
        return div;
    }

    function Lightbox (selector) {

        var containerNode = $(selector),
            wrapper,
            chromeBuilt,

            currentSlide = 0,
            slideData =[],

            boundingBox = [0,0],

            slideMap = {};


        function buildChrome(){
            wrapper = wrapperTemplate();
            document.body.appendChild(wrapper);
            //readonly long offsetWidth   当前元素及其所有内容的高度和宽度，
            // 包括元素的css内边距及边框，当有滚动条时，只返回可见部分的尺寸。
            boundingBox[0] = wrapper.getAttribute('offsetWidth');
            chromeBuilt = true;
        }

        function handleClicks(e){
            var targ = e.target;

            //prevent default is only called when conditions match
            //so that clicks to external resoures (like Flickr) work.
            if(targ.className == 'next') {
                e.preventDefault();
                goTo(currentSlide + 1);
            } else if(targ.className == 'prev'){
                e.preventDefault();
                goTo(currentSlide - 1);
            } else if (targ.className != 'flickr-link') {
                e.preventDefault();
                hide();
            }
        }

        function attachEvents(){
            wrapper.addEventListener('click', handleClicks);
        }


        function init(){
            var slides = containerNode.querySelectorAll('li');
            var thisSlide, thisImg;

            for (var i=0; i < slides.length; i++) {
                //thisSlide = {};
                thisImg = slides[i].querySelector('img');
                thisImg.slideData = {};
                thisImg.slideData.url = thisImg.getAttribute('src').replace(/_s|_q/, '_z');
                thisImg.slideData.height = thisImg.getAttribute('data-full-height');
                thisImg.slideData.width = thisImg.getAttribute('data-full-width');
                thisImg.slideData.owner = thisImg.getAttribute('data-owner');
                thisImg.slideData.link = slides[i].querySelector('a').href;

                slideMap[thisImg.slideData.link] = slideData.push(thisImg) - 1;
                thisImg.slideData.id = slideMap[thisImg.slideData.link];
            }
        }

        function buildSlide (slideNum) {

            var thisSlide, s, img, scaleFactor = 1, w, h;

            if(!slideData[slideNum] || slideData[slideNum].node){
                return false;
            }

            thisSlide = slideData[slideNum];
            s = slideTemplate(thisSlide.slideData);

            img = s.querySelector('div');

            //image is too big! scale it!
            if(thisSlide.slideData.width > boundingBox[0] || thisSlide.slideData.height > boundingBox[1]){

                if(thisSlide.slideData.width > thisSlide.slideData.height) {
                    scaleFactor = boundingBox[0]/thisSlide.slideData.width;
                } else {
                    scaleFactor = boundingBox[1]/thisSlide.slideData.height;
                }

                w = Math.round(thisSlide.slideData.width * scaleFactor);
                h = Math.round(thisSlide.slideData.height * scaleFactor);
                img.style.height = h + 'px';
                img.style.width = w + 'px';

            }else{
                img.style.height = thisSlide.slideData.height + 'px';
                img.style.width = thisSlide.slideData.width + 'px';
            }

            thisSlide.node = s;
            wrapper.appendChild(s);
            setPosition(s, boundingBox[0]);
            return s;
        }

        var i =0;

        var startPos, lastPos;
        function handleTouchEvents(e){

            var direction = 0;

            if(e.type == 'touchstart'){
                startPos = e.touches[0].clientX;
                lastPos = startPos;
                direction = 0;
                if(slideData[currentSlide] && slideData[currentSlide].node){
                    cleanTransitions(slideData[currentSlide].node);
                }

                if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
                    cleanTransitions(slideData[currentSlide + 1].node);
                }

                if(slideData[currentSlide - 1] && slideData[currentSlide -1].node){
                    cleanTransitions(slideData[currentSlide -1].node);
                }

            }else if(e.type == 'touchmove'){
                e.preventDefault();
                if(lastPos > startPos){
                    direction = -1;
                }else{
                    direction = 1;
                }
                if(slideData[currentSlide]){
                    setPosition(slideData[currentSlide].node, e.touches[0].clientX - startPos);
                    if(direction !== 0 && slideData[currentSlide + direction]){
                        if(direction < 0){
                            setPosition(slideData[currentSlide + direction].node, (e.touches[0].clientX - startPos) - boundingBox[0]);
                        }else if(direction > 0){

                            setPosition(slideData[currentSlide + direction].node, (e.touches[0].clientX - startPos) + boundingBox[0]);
                        }

                    }
                }

                lastPos = e.touches[0].clientX;
            }else if(e.type == 'touchend'){
                if(lastPos - startPos > 50){
                    goTo(currentSlide-1);
                } else if(lastPos - startPos < -50){

                    goTo(currentSlide+1);
                }else{

                    //snap back!
                    addTransitions(slideData[currentSlide].node);
                    setPosition(slideData[currentSlide].node, 0);

                    if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
                        addTransitions(slideData[currentSlide + 1]);
                        setPosition(slideData[currentSlide + 1].node, boundingBox[0]);
                    }

                    if(slideData[currentSlide - 1] && slideData[currentSlide - 1].node){
                        addTransitions(slideData[currentSlide - 1]);
                        setPosition(slideData[currentSlide - 1].node, 0 - boundingBox[0]);
                    }

                }


            }

        }

        function attachTouchEvents() {

            var bd = document.querySelector('html');
            bd.addEventListener('touchmove', handleTouchEvents);
            bd.addEventListener('touchstart', handleTouchEvents);
            bd.addEventListener('touchend', handleTouchEvents);

        }

        function setPosition(node, left) {
            node.style[TRANSFORM] =  "translate3d("+left+"px, 0, 0)";
        }

        function addTransitions(node){
            node.style[TRANSITION] = TRANSFORM_CSS + ' .25s ease-in-out';

            node.addEventListener(TRANSITION_END, function(e){
                window.setTimeout(function(){
                    e.target.style[TRANSITION] = 'none';
                }, 0);
            });
        }

        function cleanTransitions(node){
            node.style[TRANSITION] = 'none';
        }

        function goTo(slideNum){

            var thisSlide;

            //failure, return to last slide
            if(!slideData[slideNum]){
                goTo(currentSlide);
            }

            if(Math.abs(currentSlide - slideNum) !== 1 &&
                slideData[currentSlide] && slideData[currentSlide].node){
                //current slide not adjacent to new slide!
                setPosition(slideData[currentSlide].node,
                    (slideNum < currentSlide)  ? boundingBox[0] : 0 -  boundingBox[0]);
            }

            thisSlide = slideData[slideNum];

            //build the adjacent slide
            buildSlide(slideNum);
            buildSlide(slideNum + 1);
            buildSlide(slideNum - 1);

            if(thisSlide){
                //animate the slides entering and leavign
                if(thisSlide && thisSlide.node){
                    addTransitions(thisSlide.node);
                    setPosition(thisSlide.node, 0);
                }

                if(slideData[slideNum - 1] && slideData[slideNum-1].node){
                    addTransitions(slideData[slideNum - 1 ].node);
                    setPosition( slideData[slideNum - 1 ].node , (0 - boundingBox[0]) );
                }

                if(slideData[slideNum + 1] && slideData[slideNum + 1].node){
                    addTransitions(slideData[slideNum + 1 ].node);
                    setPosition(slideData[slideNum + 1 ].node, boundingBox[0] );
                }

                currentSlide = slideNum;
            }  //  滑到最右侧一张
            else if(slideNum == slideData.length){
                addTransitions(slideData[slideNum - 1 ].node);
                setPosition( slideData[slideNum - 1 ].node , 0 );
            }  //  滑到最左侧一张
            else if(slideNum == -1){
                addTransitions(slideData[slideNum + 1 ].node);
                setPosition(slideData[slideNum + 1 ].node, 0 );
            }
        }

        function show(startSlide){
            if(!chromeBuilt){
                buildChrome();
                attachEvents();
            }
            wrapper.style.display = 'block';
            //readonly long innerHeight
            //readonly long innerWidth
            // 当前窗口显示区域的文档的高度和宽度，单位是像素。IE678    不支持。
            boundingBox = [ window.innerWidth, window.innerHeight ];

            goTo(slideMap[startSlide]);
            attachTouchEvents();
        }

        function hide(){
            wrapper.style.display = 'none';
        }

        init();

        return {

            show: show,
            hide: hide
        };

    }

    return {
        Lightbox:Lightbox
    };
}($));