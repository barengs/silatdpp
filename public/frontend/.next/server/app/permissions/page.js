(()=>{var e={};e.id=111,e.ids=[111],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},85807:e=>{"use strict";e.exports=require("module")},55315:e=>{"use strict";e.exports=require("path")},76162:e=>{"use strict";e.exports=require("stream")},17360:e=>{"use strict";e.exports=require("url")},58319:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>d}),a(19205),a(32029),a(35866);var s=a(23191),n=a(88716),r=a(37922),i=a.n(r),o=a(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["permissions",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,19205)),"/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/src/app/permissions/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,32029)),"/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/src/app/permissions/page.tsx"],m="/permissions/page",u={require:a,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/permissions/page",pathname:"/permissions",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},63071:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,79404,23)),Promise.resolve().then(a.bind(a,3104)),Promise.resolve().then(a.bind(a,57057))},4970:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var s=a(10326),n=a(17577),r=a(98098),i=a(32285),o=a(12571),l=a(90434);let d=({name:e,addButtonName:t,addButtonLink:a,column:d,data:c,detailLink:m={name:"Pengaturan",to:"#"},excludes:u=["id","created_at","updated_at"]})=>{let[p,x]=(0,n.useState)(""),[h,f]=(0,n.useState)(c),[g,v]=(0,n.useState)(""),[b,j]=(0,n.useState)(""),k=(0,n.useRef)(),w=(0,n.useRef)();(0,n.useEffect)(()=>{p?f(c.filter(e=>e[g]?.toLowerCase().includes(p))):f(c)},[p,g,c]),(0,n.useEffect)(()=>{function e(e){(k.current&&!k.current.contains(e.target)||w.current&&!w.current.contains(e.target))&&j("")}return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);let y=e=>(0,o.b)(e,c,u);return(0,s.jsxs)("div",{className:"min-h-screen w-full bg-white px-4 py-2",children:[(0,s.jsxs)("div",{className:"flex flex-wrap gap-x-4 gap-y-6 py-6 md:justify-end",children:[(0,s.jsxs)("div",{className:"relative min-h-full",children:[s.jsx("button",{className:"w-max h-full hover:cursor-pointer",onClick:()=>j("filter"),children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"})})}),"filter"==b&&s.jsx("div",{ref:w,className:"absolute right-0 z-99 flex min-w-[300px] flex-col items-start gap-y-4 rounded-md border-[1px] border-gray-200 bg-white p-4 text-sm md:right-1/2",children:c.length>0&&Object.keys(c[0]).filter(e=>!u.some(t=>e==t)).map((e,t)=>s.jsx("button",{onClick:()=>v(e),className:`hover:underline ${g==e?"font-semibold":"font-normal"}`,children:(0,i.Dj)(e)},t))})]}),(0,s.jsxs)("div",{className:" flex items-center rounded-md border-[1.5px] border-slate-300 px-2 py-2",children:[s.jsx("input",{className:"min-w-[300px] flex-1 text-sm outline-none",onChange:e=>x(e.target.value.toLowerCase()),value:p,type:"text",placeholder:`Cari data berdasarkan ${g}`}),p&&s.jsx("button",{onClick:()=>x(""),children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-4",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"})})})]}),s.jsx(l.default,{href:a,className:"rounded-md bg-primary px-2 py-3 text-sm text-white",children:t}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsxs)("button",{onClick:()=>j("export"),className:`flex h-full items-center gap-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white border-[1.5px] ${"export"==b?"bg-white border-primary text-gray-500":""}`,children:["Export",s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-3",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"})})]}),"export"==b&&(0,s.jsxs)("div",{ref:k,className:"absolute right-0 z-99 mt-2 flex min-w-[300px] flex-col items-start gap-y-4 rounded-md border-[1px] border-gray-200 bg-white p-4 text-sm",children:[s.jsx("button",{className:"hover:underline",onClick:()=>y("csv"),children:"Expor ke CSV"}),s.jsx("button",{className:"hover:underline",onClick:()=>y("pdf"),children:"Expor ke PDF"})]})]})]}),s.jsx(r.ZP,{title:"",className:"mt-4",data:h,columns:d,pagination:!0,highlightOnHover:!0,customStyles:{rows:{style:{fontSize:"1rem"}},headCells:{style:{fontSize:"1rem",fontWeight:"bold"}},cells:{style:{fontSize:"1rem"}}},noDataComponent:"Tidak ada data"})]})}},57057:(e,t,a)=>{"use strict";a.d(t,{default:()=>i});var s=a(10326),n=a(4970),r=a(90434);let i=({data:e})=>s.jsx(s.Fragment,{children:s.jsx(n.Z,{name:"Data Hak Akses",data:e,column:[{name:"Nama Role",selector:e=>e.name,sortable:!0},{name:"Aksi",cell:e=>s.jsx(r.default,{className:"text-blue-500 hover:underline",href:`/guestBook/${e.id}`,children:"Edit"})}],addButtonLink:"/permissions/addData",addButtonName:"Tambah Hak Akses"})})},32285:(e,t,a)=>{"use strict";function s(e){return e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ")}function n(e){let t=new Date(e),a=t.getDate(),s=t.toLocaleString("default",{month:"long"}),n=t.getFullYear();return`${a} ${s} ${n}`}function r(e,t=15){return[e.substring(0,t),"..."].join("")}function i(){let e=new Date;return`${e.getDay()} ${e.toLocaleString("default",{month:"long"})} ${e.getFullYear()}`}a.d(t,{Dj:()=>s,Fc:()=>n,k5:()=>i,rd:()=>r})},12571:(e,t,a)=>{"use strict";a.d(t,{b:()=>o,v:()=>l});var s=a(87296),n=a(32653),r=a.n(n),i=a(32285);function o(e,t,a){"pdf"==e?function(e,t){if(0==Object.keys(e[0]).length)return;let a=new s.default;a.text("Employee List",14,10);let n=Object.keys(e[0]).filter(e=>!t.some(t=>e==t)).map(e=>e),i=e.filter(e=>!t.some(t=>e==t)).map(e=>Object.values(e));r()(a,{head:[n],body:i,headStyles:{cellWidth:"wrap"}}),a.save("table_data.pdf")}(t,a):"csv"==e&&function(e){let t="data:text/csv;charset=utf-8,"+[Object.keys(e[0]).join(","),...e.map(e=>Object.values(e).join(","))].join("\n"),a=document.createElement("a");a.href=encodeURI(t),a.download="data.csv",a.click()}(t)}function l(e){let t=new s.default,a=t.internal.pageSize.width;(function(e){let t=new Image;t.src="/lambang.jpg",e.addImage(t,"JPG",10,5,25,25),e.setFontSize(13),e.text("PEMERINTAH KABUPATEN PAMEKASAN",65,12),e.setFontSize(15),e.setFont("helvetica","bold"),e.text("DINAS PENDIDIKAN DAN KEBUDAYAAN",60,18),e.setFont("helvetica","normal"),e.setFontSize(10),e.text("JL. Raya Proppo - Pamekasan",87,23),e.text("Telp. ( 0324 ) 322 349 Fax. ( 0324 ) 327 276",75,28),e.setLineWidth(1),e.line(10,32,200,32),e.setLineWidth(.5),e.line(10,33,200,33)})(t),t.setFontSize(10),t.text(`Pamekasan, ${(0,i.k5)()}`,153,42),t.setFontSize(10),t.text("Kepada",155,55),t.text("Yth. ",155,60),t.text(`Sdr. Kepala Bank Jatim
Cabang Pamekasan
di
        PAMEKASAN`,162,60),t.setFontSize(10),t.text("Nomor      :   312312312321321",10,55),t.text("Sifat          :   Penting",10,62),t.text("Lampiran  :   -",10,69),t.text("Perihal      :   Rekomendasi",10,76),t.setFontSize(10);let n=t.splitTextToSize(`          ${e}`,a-23);t.text(n,17,95,{lineHeightFactor:2}),t.text("          Demikian permohonan ini atas perhatian dan kerjasamanya kami sampaikan terimakasih",17,120,{lineHeightFactor:2}),t.setFontSize(10),t.setFont("helvetica","bold"),t.text("KEPALA",130,150),t.text("DINAS PENDIDIKAN DAN KEBUDAYAAN",130,155),t.text("KEPALA BIDANG BIMBINGAN SD",130,160),t.text("TAUFIK HIDAYAT, S.Pd, M.Pd",130,190),t.text("NIP. 19820426 200604 1 010",130,195),t.setFont("helvetica","normal"),t.text("Tembusan:",10,235),t.text("Yth. Kepala Dinas Pendidikan Dan Kebudayaan Kabupaten Pamekasan",10,240),t.save("Surat Permohonan.pdf")}},57371:(e,t,a)=>{"use strict";a.d(t,{default:()=>n.a});var s=a(670),n=a.n(s)},670:(e,t,a)=>{"use strict";let{createProxy:s}=a(68570);e.exports=s("/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/node_modules/next/dist/client/link.js")},19205:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var s=a(19510),n=a(38589),r=a(1402);let i=(0,a(68570).createProxy)(String.raw`/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/src/components/pages/Permission/page.tsx#default`);a(71159);let o=async()=>{let e=await fetch("https://silat.barengsaya.com/api/hak-akses",{cache:"no-store"});if(!e)return s.jsx(s.Fragment,{children:"Data Tidak Tersedia"});let t=await e.json();return(0,s.jsxs)(r.Z,{children:[s.jsx(n.Z,{pageName:"Data Hak Akses"}),s.jsx(i,{data:t.data})]})}},38589:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var s=a(19510),n=a(57371);let r=({pageName:e})=>(0,s.jsxs)("div",{className:"mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",children:[s.jsx("h2",{className:"text-title-md2 font-semibold text-black dark:text-white",children:e}),s.jsx("nav",{children:(0,s.jsxs)("ol",{className:"flex items-center gap-2",children:[s.jsx("li",{children:s.jsx(n.default,{className:"font-medium",href:"/",children:"Dashboard /"})}),s.jsx("li",{className:"font-medium text-primary",children:e})]})})]})},1402:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});let s=(0,a(68570).createProxy)(String.raw`/Users/alvinsetyapranata/Documents/silatdpp/public/frontend/src/components/Layouts/DefaultLayout.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,494,339,285,653,98,193],()=>a(58319));module.exports=s})();