# jsclass

Use JavaScript Class like ActionScript

* Author : Kainan Hong <<1037714455@qq.com>>
* Source : https://github.com/hellobugme/jasclass/

## Example

```javascript
(function(){
    window.myClass = { demo : {} }; // namespace
    var Package = me.hellobug.Package,
        Class = me.hellobug.Class;

 // Package("myClass.demo").Class("ClassA")(funciton(name){
 // Class("myClass.demo.ClassA")(funciton(name){
    Package(myClass.demo).Class("ClassA")(funciton(name){
        // privileged member
        this.name = name;
        //... other privileged members

        // note: don't use private members in prototype

        // ptototype member
        var proto = this.nameSpace[this.className].prototype;
        if(typeof proto.particularMothed != "function"){
            proto.particularMothed = function(){
                //Do something
            };
            //... other prototype members
        }
    })

 // Package("myClass.demo").Class("ClassB").Extends("myClass.demo.ClassA")(funciton(name){
 // Class("myClass.demo.ClassB").Extends("myClass.demo.ClassA")(funciton(name){
    Package(myClass.demo).Class("ClassB").Extends(myClass.demo.ClassA)(funciton(name){
        // call the super class's constructor
        this.Super(name);

        //... override super class's public members, or create new members
    })
})();
```
