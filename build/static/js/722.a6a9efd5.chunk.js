"use strict";(self.webpackChunkInteractive_Dashboard=self.webpackChunkInteractive_Dashboard||[]).push([[722],{3792:(e,r,o)=>{o.d(r,{A:()=>l});var n=o(9950),a=o(226);const t=(0,o(9254).Ay)(a.A)((e=>{let{theme:r,ownerState:o}=e;const{palette:n,functions:a,borders:t,boxShadows:i}=r,{color:s,variant:c,size:l,circular:d,iconOnly:u,darkMode:m}=o,{white:h,text:g,transparent:b,gradients:f,grey:p}=n,{boxShadow:v,linearGradient:w,pxToRem:x,rgba:k}=a,{borderRadius:A}=t,{colored:y}=i;return{..."contained"===c&&(()=>{const e=n[s]?n[s].main:h.main,r=n[s]?n[s].focus:h.focus,o=y[s]?`${v([0,3],[3,0],n[s].main,.15)}, ${v([0,3],[1,-2],n[s].main,.2)}, ${v([0,1],[5,0],n[s].main,.15)}`:"none",a=y[s]?`${v([0,14],[26,-12],n[s].main,.4)}, ${v([0,4],[23,0],n[s].main,.15)}, ${v([0,8],[10,-5],n[s].main,.2)}`:"none";let t=h.main;m||"white"!==s&&"light"!==s&&n[s]?!m||"white"!==s&&"light"!==s&&n[s]||(t=p[600]):t=g.main;let i=h.main;return"white"===s?i=g.main:"primary"!==s&&"error"!==s&&"dark"!==s||(i=h.main),{background:e,color:t,boxShadow:o,"&:hover":{backgroundColor:e,boxShadow:a},"&:focus:not(:hover)":{backgroundColor:r,boxShadow:n[s]?v([0,0],[0,3.2],n[s].main,.5):v([0,0],[0,3.2],h.main,.5)},"&:disabled":{backgroundColor:e,color:i}}})(),..."outlined"===c&&(()=>{const e="white"===s?k(h.main,.1):b.main,r=n[s]?n[s].main:h.main,o=n[s]?v([0,0],[0,3.2],n[s].main,.5):v([0,0],[0,3.2],h.main,.5);let a=n[s]?n[s].main:k(h.main,.75);return"white"===s&&(a=k(h.main,.75)),{background:e,color:r,borderColor:a,"&:hover":{background:b.main,borderColor:r},"&:focus:not(:hover)":{background:b.main,boxShadow:o},"&:active:not(:hover)":{backgroundColor:r,color:h.main,opacity:.85},"&:disabled":{color:r,borderColor:r}}})(),..."gradient"===c&&(()=>{const e="white"!==s&&f[s]?w(f[s].main,f[s].state):h.main,r=y[s]?`${v([0,3],[3,0],n[s].main,.15)}, ${v([0,3],[1,-2],n[s].main,.2)}, ${v([0,1],[5,0],n[s].main,.15)}`:"none",o=y[s]?`${v([0,14],[26,-12],n[s].main,.4)}, ${v([0,4],[23,0],n[s].main,.15)}, ${v([0,8],[10,-5],n[s].main,.2)}`:"none";let a=h.main;return"white"===s?a=g.main:"light"===s&&(a=f.dark.state),{background:e,color:a,boxShadow:r,"&:hover":{boxShadow:o},"&:focus:not(:hover)":{boxShadow:r},"&:disabled":{background:e,color:a}}})(),..."text"===c&&(()=>{const e=n[s]?n[s].main:h.main,r=n[s]?n[s].focus:h.focus;return{color:e,"&:hover":{color:r},"&:focus:not(:hover)":{color:r}}})(),...d&&{borderRadius:A.section},...u&&(()=>{let e=x(38);"small"===l?e=x(25.4):"large"===l&&(e=x(52));let r=`${x(11)} ${x(11)} ${x(10)}`;return"small"===l?r=x(4.5):"large"===l&&(r=x(16)),{width:e,minWidth:e,height:e,minHeight:e,padding:r,"& .material-icons":{marginTop:0},"&:hover, &:focus, &:active":{transform:"none"}}})()}}));var i=o(413),s=o(4414);const c=(0,n.forwardRef)(((e,r)=>{let{color:o,variant:n,size:a,circular:c,iconOnly:l,children:d,...u}=e;const[m]=(0,i.lZ)(),{darkMode:h}=m;return(0,s.jsx)(t,{...u,ref:r,color:"primary",variant:"gradient"===n?"contained":n,size:a,ownerState:{color:o,variant:n,size:a,circular:c,iconOnly:l,darkMode:h},children:d})}));c.defaultProps={size:"medium",variant:"contained",color:"white",circular:!1,iconOnly:!1};const l=c},1606:(e,r,o)=>{o.d(r,{A:()=>d});var n=o(9950),a=o(1942),t=o.n(a),i=o(47);const s=(0,o(9254).Ay)(i.A)((e=>{let{theme:r,ownerState:o}=e;const{palette:n,functions:a}=r,{error:t,success:i,disabled:s}=o,{grey:c,transparent:l,error:d,success:u}=n,{pxToRem:m}=a;return{backgroundColor:s?`${c[200]} !important`:l.main,pointerEvents:s?"none":"auto",...t&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:`right ${m(12)} center`,backgroundSize:`${m(16)} ${m(16)}`,"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:d.main}},"& .MuiInputLabel-root.Mui-focused":{color:d.main}},...i&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:`right ${m(12)} center`,backgroundSize:`${m(16)} ${m(16)}`,"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:u.main}},"& .MuiInputLabel-root.Mui-focused":{color:u.main}}}}));var c=o(4414);const l=(0,n.forwardRef)(((e,r)=>{let{error:o,success:n,disabled:a,...t}=e;return(0,c.jsx)(s,{...t,ref:r,ownerState:{error:o,success:n,disabled:a}})}));l.defaultProps={error:!1,success:!1,disabled:!1},l.propTypes={error:t().bool,success:t().bool,disabled:t().bool};const d=l},6038:(e,r,o)=>{o.r(r),o.d(r,{default:()=>L});var n=o(8089),a=o(6639),t=o(8102),i=o(2498),s=o(1606),c=o(3792),l=o(899),d=o(9950),u=o(8429),m=o(413),h=o(4414);function g(e){let{background:r,children:o}=e;const[,n]=(0,m.lZ)(),{pathname:a}=(0,u.zy)();return(0,d.useEffect)((()=>{(0,m.JK)(n,"page")}),[a]),(0,h.jsx)(t.A,{width:"100vw",height:"100%",minHeight:"100vh",bgColor:r,sx:{overflowX:"hidden"},children:o})}g.defaultProps={background:"default"};const b=g;const f=function(e){let{image:r,children:o}=e;return(0,h.jsxs)(b,{children:[(0,h.jsx)(t.A,{position:"absolute",width:"100%",minHeight:"100vh",sx:{backgroundImage:e=>{let{functions:{linearGradient:o,rgba:n},palette:{gradients:a}}=e;return r&&`${o(n(a.dark.main,.6),n(a.dark.state,.6))}, url(${r})`},backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}),(0,h.jsx)(t.A,{px:1,width:"100%",height:"100vh",mx:"auto",children:(0,h.jsx)(l.Ay,{container:!0,spacing:1,justifyContent:"center",alignItems:"center",height:"100%",children:(0,h.jsx)(l.Ay,{item:!0,xs:11,sm:9,md:5,lg:4,xl:3,children:o})})})]})},p=o.p+"static/media/bg-sign-in-basic.f327db1d0e4b00ba3c81.jpeg";var v=o(8676),w=o(4281);var x=o(5532),k=o(9416),A=o(300);const y=e=>{e?(w.A.defaults.headers.common["x-auth-token"]=e,localStorage.setItem("token",e)):(delete w.A.defaults.headers.common["x-auth-token"],localStorage.removeItem("token"))};var C=o(4080),S=o(7930);const j="open",$="severity",M="message";var O=o(257),R=o(369),I=o(8217),z=o(4635),E=o(3728),P=o(4735);const L=function(){const e=(0,d.useRef)(null),[r,o]=(0,d.useState)(""),[l,m]=(0,d.useState)(""),g=(0,u.Zp)(),{login:b}=(0,x.A)(),L=(0,A.wA)(),[W,G]=(0,d.useState)(!1),H=async o=>{o.preventDefault();try{G(!0),L((0,S.Gg)({[j]:!0,[$]:"info",[M]:"youAreSigning"}));const{auth:o,token:n}=await(async(e,r)=>(await w.A.post(`${v.W1}/login`,{email:e,password:r})).data)(r,l),{role:a}=(0,R.s)(n);b(n),n&&(L((0,S.Gg)({[j]:!0,[$]:"success",[M]:"youHaveSuccessfullyRegistered"})),L((0,k._E)(n))),o&&(e.current.continuousStart(),y(n),"admin"===a&&L((0,O.hU)()),"admin"!==a&&"Oadmin"!==a&&"Osupervisor"!==a&&"Ouser"!==a&&"Oviewer"!==a||L((0,E.SA)()).finally((()=>{"admin"!==a&&(e.current.complete(),G(!1),"Oadmin"===a||"Osupervisor"===a?g(P.yg):"Ouser"===a?g(P.qg):"Oviewer"===a&&g(P.Sw))})),"admin"!==a&&"supervisor"!==a&&"viewer"!==a||L((0,C.NW)()).finally((()=>{e.current.complete(),G(!1),g(P.L6)})))}catch(n){L((0,S.Gg)({[j]:!0,[$]:"error",[M]:n.message}))}};return(0,h.jsx)(f,{image:p,children:(0,h.jsxs)(n.A,{children:[(0,h.jsx)(I.A,{color:"#08f560",ref:e,height:10,shadow:!1}),(0,h.jsx)(t.A,{variant:"gradient",bgColor:"info",borderRadius:"lg",coloredShadow:"info",mx:2,mt:-3,p:2,mb:1,textAlign:"center",children:(0,h.jsx)(i.A,{variant:"h4",fontWeight:"medium",color:"white",mt:1,children:(0,z.t)("signin")})}),(0,h.jsx)(t.A,{pt:4,pb:3,px:3,children:(0,h.jsxs)(t.A,{component:"form",role:"form",children:[(0,h.jsx)(t.A,{mb:2,children:(0,h.jsx)(s.A,{type:"email",label:(0,z.t)("email"),InputLabelProps:{shrink:!0},value:r,onChange:e=>o(e.target.value),fullWidth:!0})}),(0,h.jsx)(t.A,{mb:2,children:(0,h.jsx)(s.A,{type:"password",label:(0,z.t)("password"),InputLabelProps:{shrink:!0},value:l,onChange:e=>m(e.target.value),fullWidth:!0})}),(0,h.jsx)(t.A,{mt:4,mb:1,children:(0,h.jsx)(c.A,{variant:"gradient",color:"info",onClick:e=>H(e),disabled:W,fullWidth:!0,children:W?(0,h.jsx)(a.A,{color:"inherit",size:24}):(0,z.t)("signin")})})]})})]})})}},8089:(e,r,o)=>{o.d(r,{A:()=>p});var n=o(8168),a=o(8587),t=o(9950),i=o(2004),s=o(8465),c=o(9254),l=o(8463),d=o(2235),u=o(4144),m=o(423);function h(e){return(0,m.Ay)("MuiCard",e)}(0,u.A)("MuiCard",["root"]);var g=o(4414);const b=["className","raised"],f=(0,c.Ay)(d.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})((()=>({overflow:"hidden"}))),p=t.forwardRef((function(e,r){const o=(0,l.b)({props:e,name:"MuiCard"}),{className:t,raised:c=!1}=o,d=(0,a.A)(o,b),u=(0,n.A)({},o,{raised:c}),m=(e=>{const{classes:r}=e;return(0,s.A)({root:["root"]},h,r)})(u);return(0,g.jsx)(f,(0,n.A)({className:(0,i.A)(m.root,t),elevation:c?8:void 0,ref:r,ownerState:u},d))}))}}]);