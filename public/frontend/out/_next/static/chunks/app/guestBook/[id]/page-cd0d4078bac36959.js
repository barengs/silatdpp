(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[231],{3117:function(e,t,a){Promise.resolve().then(a.bind(a,8794))},2598:function(e,t,a){"use strict";var s=a(7437),r=a(7648);t.Z=e=>{let{pageName:t}=e;return(0,s.jsxs)("div",{className:"mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",children:[(0,s.jsx)("h2",{className:"text-title-md2 font-semibold text-black dark:text-white",children:t}),(0,s.jsx)("nav",{children:(0,s.jsxs)("ol",{className:"flex items-center gap-2",children:[(0,s.jsx)("li",{children:(0,s.jsx)(r.default,{className:"font-medium",href:"/",children:"Dashboard /"})}),(0,s.jsx)("li",{className:"font-medium text-primary",children:t})]})})]})}},5788:function(e,t,a){"use strict";var s=a(7437),r=a(9376),l=a(2265);t.Z=e=>{let{title:t,autoCompleteData:a,onValueChange:n,addItemPath:i,onSelectAutoComplete:o,defaultValue:u="",name:d=""}=e,[c,m]=(0,l.useState)(u),[f,x]=(0,l.useState)([]),[h,b]=(0,l.useState)(!1),g=(0,r.useRouter)();(0,l.useEffect)(()=>n(c),[c]),(0,l.useEffect)(()=>m(u),[u]);let p=e=>{b(!1),m(e),o(e)};return(0,l.useEffect)(()=>{x(a)},[a]),(0,s.jsxs)("div",{onBlur:()=>{setTimeout(()=>b(!1),500)},children:[(h||c)&&(0,s.jsx)("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",children:t}),(0,s.jsx)("input",{type:"text",placeholder:t,value:c,onChange:e=>{e.target.value?b(!0):b(!1),m(e.target.value)},name:d,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"}),(0,s.jsxs)("div",{className:"rounded-md bg-gray-100 w-full overflow-hidden px-4 py-2 mt-2 flex flex-col gap-y-4 text-left ".concat(h&&a?"":"hidden"),children:[null==f?void 0:f.filter(e=>!e||e.toLowerCase().includes(c.toLowerCase())).map((e,t)=>(0,s.jsx)("button",{onClick:()=>p(e),className:"hover:bg-blue-500 hover:text-white w-full text-left",children:e},t)),(0,s.jsx)("button",{onClick:()=>g.push(i),className:"hover:bg-blue-500 hover:text-white w-full",children:"+"})]})]})}},8794:function(e,t,a){"use strict";var s=a(7437),r=a(2598),l=a(5788),n=a(2704),i=a(7648),o=a(2265);t.default=e=>{let{params:t}=e,[a,u]=(0,o.useState)({id:0,guestName:"",instutionName:"",instutionAddress:"",needs:"",position:"",contact:""}),d=(e,t)=>{u(a=>(a[t]=e,a))};return(0,s.jsxs)(n.default,{children:[(0,s.jsx)(i.default,{href:"/users",className:"mb-6",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"})})}),(0,s.jsx)(r.Z,{pageName:"Detail Buku Tamu"}),(0,s.jsxs)("div",{className:"rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark",children:[(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-9",children:[(0,s.jsx)(l.Z,{title:"Nama Tamu",defaultValue:a.guestName,onValueChange:e=>d(e,"guestName")}),(0,s.jsx)(l.Z,{title:"Nama Instusi",defaultValue:a.instutionName,onValueChange:e=>d(e,"instutionName")}),(0,s.jsx)(l.Z,{title:"Alamat Instusi",defaultValue:a.instutionAddress,onValueChange:e=>d(e,"instutionAddress")}),(0,s.jsx)(l.Z,{title:"Keperluan",defaultValue:a.needs,onValueChange:e=>d(e,"needs")}),(0,s.jsx)(l.Z,{title:"Jabatan",defaultValue:a.position,onValueChange:e=>d(e,"position")}),(0,s.jsx)(l.Z,{title:"Kontak",defaultValue:a.contact,onValueChange:e=>d(e,"contact")})]}),(0,s.jsx)("button",{className:"flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4",children:"Perbarui Data"})]})]})}}},function(e){e.O(0,[718,704,971,117,744],function(){return e(e.s=3117)}),_N_E=e.O()}]);