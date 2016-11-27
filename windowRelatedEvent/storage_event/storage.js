/**
 * Created by a_wav on 2016/11/26.
 */
(function (window) {
    var ls = window.localStorage;
    var stf = JSON.stringify;
    var pas = JSON.parse;

    function storage() {
        this.cache = {};

        this.init = function () {
            var len = ls.length;
            var ky;
            //read data from localStorage
            for(var i=0;i<len;++i){
                ky = ls.key(i);
                this.cache[ky] = pas(ls.getItem(ky));
            }

            //set storage event handler
            window.addEventListener('storage',this.update.bind(this),false);

        };

        this.getItem = function (key) {
            return this.cache[key];
        };

        this.setItem = function (key,value) {
            this.cache[key] = value;

            ls.setItem(key,stf(value));
        };

        this.removeItem = function (key) {
            delete this.cache[key];

            ls.removeItem(key);
        };

        this.clear = function () {
            this.cache = {};
            ls.clear();
        };

        // storage event handler
        this.update = function (e) {
            if(e.key){

                if(e.newValue && !e.oldValue){
                    //add key-value
                    this.cache[e.key] = e.newValue;
                }else if(!e.newValue && e.oldValue){
                    delete this.cache[e.key];
                }
            }else{
                this.cache = {};
            }
            console.log(this.cache);
        };

        // 初始化
        this.init();
    }


    /*
    * 封装:
    * 暴露public方法和变量
    * 隐藏private方法和变量
    * */
    function STORAGE() {
        var stg = new storage();
        return {
            getItem:stg.getItem.bind(stg),
            setItem:stg.setItem.bind(stg),
            removeItem:stg.removeItem.bind(stg),
            clear:stg.clear.bind(stg)
        };
    }

    window.Cache = STORAGE;

})(window);