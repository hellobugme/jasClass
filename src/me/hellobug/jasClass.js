/**
 * Use JavaScript Class like ActionScript
 * @source https://github.com/hellobugme/jasclass/
 * @author Kainan Hong <1037714455@qq.com>
 * @version 2015.06.06
 */
(function(libNameSpace){
    /**
     * 类的构造
     * @param {String} className (带命名空间的)类名
     * @return {Function} initFn 初始化入口
     */
    function Class(className, nameSpace){
        var classDef = $getDefinitionByName(className);
        className = classDef.className;
        nameSpace = nameSpace || classDef.nameSpace || window;

        function Class(){
            this.Constructor.apply(this, arguments);
        }
        Class.prototype = {
            constructor : Class,    // 构造器
            superClass : null,      // 父类
            className : className,  // 类名
            toString : function(){ return "[object " + this.className + "]"; }
        };

        /**
         * 初始化入口
         */
        function initFn(definition){
            if (typeof definition === 'function') {
                if(Class.prototype.superClass === null) {
                    Class.prototype.superClass = Object;
                }
                definition.call(Class, Class.prototype, Class.prototype.superClass.prototype);
                if(!("Constructor" in Class.prototype)){
                    Class.prototype.Constructor = Class.prototype.superClass;
                }
            }
        }

        /**
         * 继承实现
         * @param {Function/String} superClass 带命名空间的超类(名)
         * @return {Function} initFn 初始化入口
         */
        initFn.Extends = function(superClass){
            // 单继承
            if(!Class.prototype.superClass){
                if(typeof superClass === "string"){
                    superClass = $getDefinitionByName(superClass).classReference;
                }
                $inheritPrototype(Class, superClass);
            }
            return initFn;
        };

        nameSpace[className] = Class;
        return initFn;
    }

    // 原型式寄生组合继承
    function Prototype(){}
    function $inheritPrototype(subClass, superClass){
        var oProto = subClass.prototype, nProto;
        Prototype.prototype = superClass.prototype;
        nProto = new Prototype();
        for(var p in oProto){
            nProto[p] = oProto[p];
        }
        nProto.superClass = superClass;
        subClass.prototype = nProto;
    }

    /**
     * 创建命名空间
     * @param {Object/String} param 命名空间对象/名字
     */
    function $nameSpace(param){
        var ret = null;
        switch(typeof param){
            case "object":
                ret = param;
                break;
            case "string":
                if(param === ""){
                    ret = window;
                } else if(/^\w+(\.\w+)*$/.test(param)){
                    // 格式必须为 "a.bb.ccc"
                    var arr = param.split("."), _parent = window;
                    for(var i = 0, l = arr.length; i < l; i++){
                        var o = arr[i];
                        (!_parent[o]) && (_parent[o] = {});
                        _parent = _parent[o];
                    }
                    ret = _parent;
                }
                break;
        }
        return ret;
    }
    // 获取字符串相应的类的信息
    function $getDefinitionByName(str){
        var lastDotIdx = str.lastIndexOf("."),
            nameSpace = $nameSpace(str.substring(0, lastDotIdx)),
            className = str.substring(lastDotIdx + 1);
        return {
            classReference : nameSpace[className], // 类的引用
            nameSpace : nameSpace, // 命名空间
            className : className // 类名
        };
    }

    libNameSpace = $nameSpace(libNameSpace);
    libNameSpace.Class = Class;
    libNameSpace.Package = function(ns){
        return {
            Class : function(className){
                return new libNameSpace.Class(className, $nameSpace(ns || window));
            }
        };
    };
})(this);