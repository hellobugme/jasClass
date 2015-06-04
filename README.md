# jsclass

Use JavaScript Class like ActionScript

* Author : Kainan Hong <<1037714455@qq.com>>
* Source : https://github.com/hellobugme/jasclass/

## Example

```javascript
(function(){
    window.demo = { myclasses : {} }; // namespace
    var Package = me.hellobug.Package,
        Class = me.hellobug.Class;

 // Class("demo.myclasses.Person")(funciton(name){
 // Package("demo.myclasses").Class("Person")(funciton(name){
    Package(demo.myclasses).Class("Person")(funciton(name){
        // privileged member
        this.name = name;
        //... other privileged members

        // note: don't use private members in prototype

        // ptototype member
        var Person = demo.myclasses.Person;
        if(!Person._ptoto){
            Person._proto = true;
            var proto = Person.prototype;
            proto.sayHi = function(){
                //...
            };
            //... other prototype members
        }
    })

 // Class("demo.myclasses.User").Extends("demo.myclasses.Person")(funciton(name, password){
 // Package("demo.myclasses").Class("User").Extends("demo.myclasses.Person")(funciton(name, password){
    Package(demo.myclasses).Class("User").Extends(demo.myclasses.Person)(funciton(name, password){
        // call the super class's constructor
        this.Super(name);

        //... override super class's public members, or create new members
    })
})();
```
