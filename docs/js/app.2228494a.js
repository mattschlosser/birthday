(function(t){function e(e){for(var n,o,s=e[0],l=e[1],c=e[2],d=0,f=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(n=!1)}n&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},r={app:0},i=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},3618:function(t,e,a){"use strict";a("bec9")},"452c":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("h1",{staticClass:"center"},[t._v(" Simple Birthday Calendar ")]),t._m(0),a("button",{staticClass:"btn",on:{click:t.askReset}},[t._v("Clear Everything")]),a("button",{staticClass:"btn",on:{click:function(){return t.editing=!t.editing}}},[t._v("Add Birthdays")]),a("input",{staticClass:"btn",attrs:{type:"file"},on:{change:function(e){return t.load(e)}}}),a("a",{staticClass:"btn",attrs:{href:t.saveFile,target:"_blank"}},[t._v("Save")]),a("transition",{attrs:{name:"fade"}},[t.editing?a("div",[a("h2",{staticClass:"center"},[t._v("Categories")]),a("form",{on:{submit:function(e){return e.preventDefault(),t.addFamily(e)}}},[a("div",{staticClass:"form"},[a("div",[a("label",{attrs:{for:"familyName"}},[t._v("Category")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.familyName,expression:"familyName"}],attrs:{name:"familyName"},domProps:{value:t.familyName},on:{input:function(e){e.target.composing||(t.familyName=e.target.value)}}})]),a("div",[a("label",{attrs:{for:"color"}},[t._v("Colour")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.color,expression:"color"}],attrs:{name:"color",type:"color"},domProps:{value:t.color},on:{input:function(e){e.target.composing||(t.color=e.target.value)}}}),a("button",[t._v("Add Category")])])])]),a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",[t._v("Name")]),a("th",[t._v("Color")]),a("th",[t._v("Actions")])])]),a("tbody",t._l(t.families,(function(e,n){return a("tr",{key:n},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.color))]),a("td",[a("button",{on:{click:function(e){return t.removeFam(n)}}},[t._v("Remove")])])])})),0)]),a("h2",{staticClass:"center"},[t._v("Birthdays")]),t.families.length?[a("form",{on:{submit:function(e){return e.preventDefault(),t.addToList(e)}}},[a("div",{staticClass:"form"},[a("div",[a("label",{attrs:{for:"type"}},[t._v("Type")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],attrs:{required:"",name:"type"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.type=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"Birthday"}},[t._v("Birthday")]),a("option",[t._v("Anniversary")])])]),a("div",[a("label",{attrs:{for:"family"}},[t._v("Category")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.family,expression:"family"}],attrs:{required:"",name:"family"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.family=e.target.multiple?a:a[0]}}},t._l(t.families,(function(e){return a("option",{key:e},[t._v(" "+t._s(e.name)+" ")])})),0)]),a("div",[a("label",{attrs:{for:"name"}},[t._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{required:"",name:"name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),a("div",[a("label",{attrs:{for:"date"}},[t._v("Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],attrs:{required:"",type:"date"},domProps:{value:t.date},on:{input:function(e){e.target.composing||(t.date=e.target.value)}}}),a("button",{attrs:{type:"submit"}},[t._v("Add")])])])]),a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",[t._v("Name")]),a("th",[t._v("Date")]),a("th",[t._v("Type")]),a("th",[t._v("Family")]),a("th",[t._v("Actions")])])]),a("tbody",t._l(t.bdays,(function(e,n){return a("tr",{key:n},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.date))]),a("td",[t._v(t._s(e.type))]),a("td",[t._v(t._s(e.fam))]),a("td",[a("button",{attrs:{type:"button"},on:{click:function(e){return t.remove(n)}}},[t._v("Delete")])])])})),0)])]:[a("div",{staticClass:"message"},[t._v("Before you can add birthdays, add at least one category")])]],2):t._e()]),a("calendar",{attrs:{families:t.families,items:t.bdays}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"center container"},[a("div",{staticClass:"left"},[t._v(" Add birthdays and anniversaries to this calendar. The calendar displays the events colour-coded by category, and automatically shows the age the person is turning on that day (e.g. Bob's 1st Birthday) ")])])}],o=(a("a434"),a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("96cf"),a("1da1")),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("button",{on:{click:function(){t.showDate.setMonth(t.showDate.getMonth()-1),t.showDate=new Date(t.showDate)}}},[t._v(" < ")]),a("h1",{staticClass:"center",staticStyle:{display:"inline-block","padding-left":"15px","padding-right":"15px"},attrs:{contenteditable:"true"}},[t._v(t._s(["January","February","March","April","May","June","July","August","September","October","November","December"][t.showDate.getMonth()])+" "+t._s(t.showDate.getFullYear()))]),a("button",{on:{click:function(){t.showDate.setMonth(t.showDate.getMonth()+1),t.showDate=new Date(t.showDate)}}},[t._v(" > ")]),a("calendar-view",{staticClass:"theme-default",attrs:{items:t.myItems,itemContentHeight:"2.1em","show-date":t.showDate}})],1)},l=[],c=(a("99af"),a("7db0"),a("d81d"),a("fb6a"),a("a9e3"),a("83b0"));function u(t){var e=(new Date).getFullYear(),a=e-t.slice(0,4),n="",r=Number(String(a).slice(-2)),i=String(r).slice(-1);return n=r>=11&&r<=13?"th":3==i?"rd":2==i?"nd":1==i?"st":"th",a+n}a("8bb7");var d={props:{items:Array,families:Array},data:function(){return{showDate:new Date("2021-01-02")}},computed:{myItems:function(){var t=this;return this.items.map((function(e,a){var n="2021-".concat(e.date.slice(5));return{id:a,startDate:n,title:"".concat(e.name,"'s\n").concat(u(e.date)," ").concat(e.type),style:"color: ".concat(t.families.find((function(t){return t.name==e.fam})).color),classes:"".concat(e.fam," ").concat("2021-05-29"==n||"2021-06-28"==n||"2021-07-01"==n||"2021-07-20"==n||"2021-07-24"==n||"2021-07-26"==n||"2021-07-27"==n?"tinier":"tiny"),itemContentHeight:"2021-05-29"==n||"2021-06-28"==n||"2021-07-01"==n||"2021-07-20"==n||"2021-07-24"==n||"2021-07-26"==n||"2021-07-27"==n?"2em":"2.8em"}}))}},components:{CalendarView:c["CalendarView"]},methods:{setShowDate:function(t){this.showDate=t}}},f=d,m=(a("3618"),a("fae2"),a("2877")),v=Object(m["a"])(f,s,l,!1,null,"2f5f5735",null),p=v.exports,y=a("3d20"),h=a.n(y);a("4413");localStorage.birthdays||(localStorage.birthdays=JSON.stringify([])),localStorage.families||(localStorage.families=JSON.stringify([]));var b={components:{Calendar:p},name:"HelloWorld",bdays:[],props:{msg:String},data:function(){return{editing:!1,type:"Birthday",name:"",date:"",bdays:JSON.parse(localStorage.birthdays),family:"",familyName:"",color:"#fff",families:JSON.parse(localStorage.families)}},computed:{saveFile:function(){var t=new Blob([JSON.stringify({version:1,fams:this.families,bdays:this.bdays},null,2)],{type:"application/json"});return window.URL.createObjectURL(t)}},methods:{addFamily:function(){var t=this.familyName,e=this.color;this.families.push({name:t,color:e}),localStorage.families=JSON.stringify(this.families)},removeFam:function(t){this.families.splice(t,1),localStorage.families=JSON.stringify(this.families)},addToList:function(){var t=this.type,e=this.name,a=this.date,n=this.family;this.bdays.push({type:t,name:e,date:a,fam:n}),localStorage.birthdays=JSON.stringify(this.bdays)},remove:function(t){this.bdays.splice(t,1),localStorage.birthdays=JSON.stringify(this.bdays)},load:function(t){var e=new FileReader;e.readAsText(t.target.files[0]);var a=this;e.onload=function(){var t=JSON.parse(this.result);1===t.version&&(a.fams=t.fams,a.bdays=t.bdays,localStorage.birthdays=JSON.stringify(t.bdays),localStorage.families=JSON.stringify(t.fams))}},askReset:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h.a.fire({title:"Reset calendar",text:"This will remove all events/categories. Are you sure you want to continue?",icon:"warning",showCancelButton:!0,confirmButtonText:"Reset",focusCancel:!0});case 2:a=e.sent,a.dismiss||t.reset();case 4:case"end":return e.stop()}}),e)})))()},reset:function(){this.bdays=[],this.families=[],localStorage.birthdays="",localStorage.families=""}}},g=b,_=(a("e3ae"),a("b0a0"),Object(m["a"])(g,r,i,!1,null,"3487cf98",null)),w=_.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(w)}}).$mount("#app")},b0a0:function(t,e,a){"use strict";a("452c")},bec9:function(t,e,a){},c354:function(t,e,a){},e1b1:function(t,e,a){},e3ae:function(t,e,a){"use strict";a("e1b1")},fae2:function(t,e,a){"use strict";a("c354")}});
//# sourceMappingURL=app.2228494a.js.map