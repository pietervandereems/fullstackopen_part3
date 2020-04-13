(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,t,n){e.exports=n(40)},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(17),o=n.n(c),u=n(2),l=n(7),i=n(3),m=function(e){e.filter;var t=e.setter;return r.a.createElement("section",null,r.a.createElement("label",null,"filter shown with ",r.a.createElement("input",{onChange:function(e){var n=e.target.value;return t(n)}})))},d=function(e){var t=e.addPerson,n=Object(a.useState)({name:"",number:""}),c=Object(i.a)(n,2),o=c[0],l=c[1];return r.a.createElement("form",{onSubmit:t({newPerson:o,cleanInputs:function(){l({name:"",number:""})}})},r.a.createElement("label",null,"name: ",r.a.createElement("input",{value:o.name,onChange:function(e){var t=e.target.value;l(Object(u.a)({},o,{name:t}))}})),r.a.createElement("br",null),r.a.createElement("label",null,"number: ",r.a.createElement("input",{value:o.number,onChange:function(e){var t=e.target.value;l(Object(u.a)({},o,{number:t}))}})),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"add"))},f=function(e){var t=e.person,n=(t.id,t.name),a=t.number,c=e.removePerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("tr",null,r.a.createElement("td",null,n),r.a.createElement("td",null,a),r.a.createElement("td",null,r.a.createElement("button",{onClick:c},"delete"))))},s=function(e){var t=e.list,n=void 0===t?[]:t,a=e.removePerson;return r.a.createElement("section",null,r.a.createElement("h2",null,"Numbers"),r.a.createElement("table",null,r.a.createElement("tbody",null,n.map((function(e){return r.a.createElement(f,{key:e.id,person:e,removePerson:a(e)})})))))},b=n(5),E=n.n(b),p="http://localhost:3001/api/persons",h=function(){return E.a.get(p).then((function(e){return Object(l.a)(e.data)}))},v=function(e){return E.a.post(p,e).then((function(e){return e.data}))},g=function(e){return E.a.delete("".concat(p,"/").concat(e))},j=function(e){return E.a.put("".concat(p,"/").concat(e.id),e).then((function(e){return e.data}))},O=function(e){var t=e.notification,n=t.txt,a=t.isError;if(!n)return null;var c={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},o=Object(u.a)({},c,{color:"red"}),l=Object(u.a)({},c,{color:"darkgreen"});return r.a.createElement("div",{style:a?o:l},n)},w=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),f=Object(i.a)(o,2),b=f[0],E=f[1],p=Object(a.useState)(""),w=Object(i.a)(p,2),C=w[0],k=w[1];Object(a.useEffect)((function(){h().then((function(e){return c(Object(l.a)(e))}))}),[]);var x,P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{txt:"",isError:!1};k(e),setTimeout((function(){return k({txt:""})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(O,{notification:C}),r.a.createElement(m,{filter:b,setter:E}),r.a.createElement("h2",null,"add a new"),r.a.createElement(d,{addPerson:function(e){var t=e.newPerson,a=e.cleanInputs;return function(e){e.preventDefault();var r=n.filter((function(e){return e.name.toUpperCase()===t.name.toUpperCase()}));r.length>0?window.confirm("".concat(t.name," is already added to the phonebook, replace the old number with a new one?"))&&j(Object(u.a)({},r[0],{number:t.number})).then((function(e){c(n.map((function(t){return t.id===e.id?e:t}))),P({txt:"Changed ".concat(e.name)})})).catch((function(e){P({txt:"Could not update ".concat(t.name),isError:!0})})):(v(t).then((function(e){c(n.concat([e])),P({txt:"Added ".concat(e.name)})})).catch((function(e){P({txt:"Could not create ".concat(t.name),isError:!0})})),a())}}}),r.a.createElement(s,{list:n.filter((x=b,x?function(e){return e.name.toUpperCase().includes(x.toUpperCase())}:function(){return!0})),removePerson:function(e){var t=e.name,a=e.id;return function(){window.confirm("Delete ".concat(t," ?"))&&g(a).then((function(){c(n.filter((function(e){return e.id!==a}))),P({txt:"Deleted ".concat(t)})})).catch((function(e){P({txt:"Could not delete ".concat(t),isError:!0})}))}}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.7f5b82e1.chunk.js.map