(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[676],{89479:function(e,t,a){Promise.resolve().then(a.bind(a,13182))},81154:function(e,t,a){"use strict";var l=a(57437),r=a(27648);t.Z=e=>{let{pageName:t}=e;return(0,l.jsxs)("div",{className:"mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",children:[(0,l.jsx)("h2",{className:"text-title-md2 font-semibold text-black dark:text-white",children:t}),(0,l.jsx)("nav",{children:(0,l.jsxs)("ol",{className:"flex items-center gap-2",children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.default,{className:"font-medium",href:"/",children:"Dashboard /"})}),(0,l.jsx)("li",{className:"font-medium text-primary",children:t})]})})]})}},85788:function(e,t,a){"use strict";var l=a(57437),r=a(99376),s=a(2265);t.Z=e=>{let{title:t,autoCompleteData:a=[],onSelectedAutoComplete:n=e=>void 0,addItemPath:i="",defaultValue:o="",type:d="text",multiple:u=!1,name:c=""}=e,m=(0,r.useRouter)(),[x,h]=(0,s.useState)(o),[f,b]=(0,s.useState)([]),[p,g]=(0,s.useState)(!1),k=e=>{h(e),g(!1),n(e)};return(0,s.useEffect)(()=>{h(o)},[o]),(0,s.useEffect)(()=>{b(a||[])},[]),(0,l.jsxs)("div",{className:"flex-1",onBlur:()=>{setTimeout(()=>g(!1),200)},children:[(0,l.jsx)("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",children:t}),(0,l.jsx)("input",{type:d,placeholder:t,value:x,onChange:e=>{let t=e.target.value;h(t),g(!!t)},name:c,multiple:u,autoComplete:a?"off":"",className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"}),(0,l.jsxs)("div",{className:"mt-2 flex w-full flex-col gap-y-4 overflow-hidden rounded-md bg-gray-100 px-4 py-2 text-left ".concat(p&&f.length?"":"hidden"),children:[null==f?void 0:f.filter(e=>!!e&&e.toLowerCase().includes(x.toLowerCase())).map((e,t)=>(0,l.jsx)("button",{onClick:()=>k(e),className:"w-full text-left hover:bg-blue-500 hover:text-white",type:"button",children:e},t)),i&&(0,l.jsx)("button",{type:"button",onClick:()=>m.push(i),className:"w-full hover:bg-blue-500 hover:text-white",children:"+"})]})]})}},94693:function(e,t,a){"use strict";var l=a(57437);a(2265),t.Z=e=>{let{title:t,options:a,name:r,defaultValue:s}=e;return(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",children:t}),(0,l.jsxs)("div",{className:"relative z-20 bg-white dark:bg-form-input",children:[(0,l.jsxs)("select",{value:s,name:r,className:"relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ",children:[(0,l.jsx)("option",{value:"",disabled:!0,className:"text-body dark:text-bodydark",children:t}),null==a?void 0:a.map((e,t)=>(0,l.jsx)("option",{value:e.value,className:"text-body dark:text-bodydark",selected:e.value==s,children:e.name},t))]}),(0,l.jsx)("span",{className:"absolute right-4 top-1/2 z-10 -translate-y-1/2",children:(0,l.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("g",{opacity:"0.8",children:(0,l.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]})]})}},13182:function(e,t,a){"use strict";var l=a(57437),r=a(81154),s=a(85788),n=a(94693),i=a(35715),o=a(27648),d=a(2265);let u=[{name:"Admin",value:"admin"},{name:"Kepala Sekolah",value:"principal"},{name:"Admin Sekolah",value:"school_admin"}];t.default=e=>{let{params:t}=e,[a,c]=(0,d.useState)({id:"",nama:"",position:"",role:""}),m=(e,t)=>{c(a=>(a[t]=e,a))};return(0,l.jsxs)(i.default,{children:[(0,l.jsx)(o.default,{href:"/users",className:"mb-6",children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"})})}),(0,l.jsx)(r.Z,{pageName:"Detail Pengguna"}),(0,l.jsxs)("div",{className:"grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-9",children:[(0,l.jsx)(s.Z,{title:"Nama Pengguna",defaultValue:a.nama,onValueChange:e=>m(e,"nama")}),(0,l.jsx)(s.Z,{title:"Jabatan",defaultValue:a.position,onValueChange:e=>m(e,"position")}),(0,l.jsx)(n.Z,{title:"Hak Akses",options:u,defaultValue:"principal"})]}),(0,l.jsxs)("div",{className:"space-y-6 mt-12",children:[(0,l.jsx)("button",{className:"flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90",children:"Perbarui Data"}),(0,l.jsx)("button",{className:"flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90",children:"Hapus Data"})]})]})]})}}},function(e){e.O(0,[281,718,715,971,117,744],function(){return e(e.s=89479)}),_N_E=e.O()}]);