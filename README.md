# jsclass

Use JavaScript Class like ActionScript

* Author : Kainan Hong <<1037714455@qq.com>>
* Source : https://github.com/hellobugme/jasclass/

## Example

```javascript
(function(){
    window.demo = { myclasses : {} }; // namespace

 // Class("demo.myclasses.Person")(funciton(Person){
 // Package("demo.myclasses").Class("Person")(funciton(Person){
    Package(demo.myclasses).Class("Person")(funciton(Person){
        // set constructor
        Person.Constructor = function(name){
            // privileged member
            this.name = name;
            //... other privileged members
        }

        // note: don't use private members in prototype

        // ptototype member
        Person.sayHi = function(){
            //...
        };
        //... other prototype members
    })

 // Class("demo.myclasses.User").Extends("demo.myclasses.Person")(funciton(User, Super){
 // Package("demo.myclasses").Class("User").Extends("demo.myclasses.Person")(funciton(User, Super){
    Package(demo.myclasses).Class("User").Extends(demo.myclasses.Person)(funciton(User, Super){
        User.Constructor = function(name, password){
            // call the super class's constructor
            Super.Constructor.call(this, name);
        }

        //... override super class's public members, or create new members
    })
})();
```
