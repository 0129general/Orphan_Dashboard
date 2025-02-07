"use strict";(self.webpackChunkInteractive_Dashboard=self.webpackChunkInteractive_Dashboard||[]).push([[348],{995:(e,r,t)=>{t.d(r,{A:()=>p});var o=t(9950),n=t(5333),i=t(3651),a=t(6491),s=t(2053),l=t(226),c=t(4243),d=t(9788),u=t(7818),h=t(4414);const p=e=>{let{onDelete:r}=e;const{t:t}=(0,u.Bd)(),[p,x]=(0,o.useState)(!1),g=()=>x(!1);return(0,h.jsxs)("div",{children:[(0,h.jsx)(n.A,{onClick:()=>x(!0),sx:{backgroundColor:"#ff3d00",color:"#fff",padding:"12px",borderRadius:"50%",boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease","&:hover":{backgroundColor:"#ff1744",transform:"scale(1.1)",boxShadow:"0px 6px 16px rgba(0, 0, 0, 0.3)"}},children:(0,h.jsx)(c.RCe,{size:20})}),(0,h.jsx)(i.A,{open:p,onClose:g,"aria-labelledby":"delete-confirmation-modal","aria-describedby":"confirm-delete-operation",closeAfterTransition:!0,BackdropProps:{timeout:500},sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,h.jsx)(d.P.div,{initial:{opacity:0,y:"-30%"},animate:{opacity:1,y:"0%"},exit:{opacity:0,y:"-30%"},transition:{duration:.5},children:(0,h.jsxs)(a.A,{sx:{width:400,backdropFilter:"blur(15px)",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"20px",boxShadow:"0px 8px 32px rgba(0, 0, 0, 0.3)",border:"1px solid rgba(255, 255, 255, 0.2)",p:4,textAlign:"center"},children:[(0,h.jsx)(s.A,{id:"delete-confirmation-modal",variant:"h5",component:"h2",gutterBottom:!0,sx:{fontWeight:700,color:"#000000"},children:t("deleteItem")}),(0,h.jsx)(s.A,{id:"confirm-delete-operation",sx:{mt:2,color:"#000000"},children:t("confirmDesc")}),(0,h.jsxs)(a.A,{mt:4,display:"flex",justifyContent:"space-between",gap:2,children:[(0,h.jsx)(l.A,{variant:"outlined",color:"info",onClick:g,sx:{width:"100%",fontWeight:600,borderRadius:"12px",borderColor:"#fff",color:"#000000",backdropFilter:"blur(5px)",backgroundColor:"#f1f1f3","&:hover":{backgroundColor:"#969393",borderColor:"#fff"}},children:t("cancel")}),(0,h.jsx)(l.A,{variant:"contained",color:"error",onClick:()=>{r(),g()},sx:{width:"100%",fontWeight:600,borderRadius:"12px",backgroundColor:"#d63845",color:"#FFFFFF",backdropFilter:"blur(5px)","&:hover":{backgroundColor:"#eb1b09",boxShadow:"0px 4px 12px rgba(255, 23, 68, 0.4)"}},children:t("confirm")})]})]})})})]})}},1606:(e,r,t)=>{t.d(r,{A:()=>d});var o=t(9950),n=t(1942),i=t.n(n),a=t(47);const s=(0,t(9254).Ay)(a.A)((e=>{let{theme:r,ownerState:t}=e;const{palette:o,functions:n}=r,{error:i,success:a,disabled:s}=t,{grey:l,transparent:c,error:d,success:u}=o,{pxToRem:h}=n;return{backgroundColor:s?`${l[200]} !important`:c.main,pointerEvents:s?"none":"auto",...i&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:`right ${h(12)} center`,backgroundSize:`${h(16)} ${h(16)}`,"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:d.main}},"& .MuiInputLabel-root.Mui-focused":{color:d.main}},...a&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:`right ${h(12)} center`,backgroundSize:`${h(16)} ${h(16)}`,"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:u.main}},"& .MuiInputLabel-root.Mui-focused":{color:u.main}}}}));var l=t(4414);const c=(0,o.forwardRef)(((e,r)=>{let{error:t,success:o,disabled:n,...i}=e;return(0,l.jsx)(s,{...i,ref:r,ownerState:{error:t,success:o,disabled:n}})}));c.defaultProps={error:!1,success:!1,disabled:!1},c.propTypes={error:i().bool,success:i().bool,disabled:i().bool};const d=c},7825:(e,r,t)=>{t.d(r,{A:()=>u});var o=t(9950),n=t(8102),i=t(9254),a=t(3792);const s=(0,i.Ay)(a.A)((e=>{let{theme:r,ownerState:t}=e;const{borders:o,functions:n,typography:i,palette:a}=r,{variant:s,paginationSize:l,active:c}=t,{borderColor:d}=o,{pxToRem:u}=n,{fontWeightRegular:h,size:p}=i,{light:x}=a;let g=u(36);return"small"===l?g=u(30):"large"===l&&(g=u(46)),{borderColor:d,margin:`0 ${u(2)}`,pointerEvents:c?"none":"auto",fontWeight:h,fontSize:p.sm,width:g,minWidth:g,height:g,minHeight:g,"&:hover, &:focus, &:active":{transform:"none",boxShadow:("gradient"!==s||"contained"!==s)&&"none !important",opacity:"1 !important"},"&:hover":{backgroundColor:x.main,borderColor:d}}}));var l=t(4414);const c=(0,o.createContext)(null),d=(0,o.forwardRef)(((e,r)=>{let{item:t,variant:i,color:a,size:d,active:u,children:h,...p}=e;const x=(0,o.useContext)(c),g=x?x.size:null,m=(0,o.useMemo)((()=>({variant:i,color:a,size:d})),[i,a,d]);return(0,l.jsx)(c.Provider,{value:m,children:t?(0,l.jsx)(s,{...p,ref:r,variant:u?x.variant:"outlined",color:u?x.color:"secondary",iconOnly:!0,circular:!0,ownerState:{variant:i,active:u,paginationSize:g},children:h}):(0,l.jsx)(n.A,{display:"flex",justifyContent:"flex-end",alignItems:"center",sx:{listStyle:"none"},children:h})})}));d.defaultProps={item:!1,variant:"gradient",color:"info",size:"medium",active:!1};const u=d},7289:(e,r,t)=>{t.d(r,{A:()=>a});var o=t(8102),n=t(4414);function i(){return(0,n.jsx)(o.A,{width:"100%",display:"flex",flexDirection:{xs:"column",lg:"row"},justifyContent:"space-between",alignItems:"center",px:1.5})}i.defaultProps={company:{href:"https://www.creative-tim.com/",name:"Creative Tim"},links:[{href:"https://www.creative-tim.com/",name:"Creative Tim"},{href:"https://www.creative-tim.com/presentation",name:"About Us"},{href:"https://www.creative-tim.com/blog",name:"Blog"},{href:"https://www.creative-tim.com/license",name:"License"}]};const a=i},7348:(e,r,t)=>{t.r(r),t.d(r,{default:()=>W});var o=t(9950),n=t(300),i=t(8429),a=t(8089),s=t(899),l=t(226),c=t(8191),d=t(8102),u=t(2498),h=t(1200),p=t(1104),x=t(7289),g=t(2043),m=t(5769),f=t(4075),b=t(1320),v=t(9213),A=t(4919),j=t(7919),w=t(1606),y=t(7825),C=t(413),S=t(4414);function T(e){let{width:r,children:t,sorted:o,align:n,...i}=e;const[a]=(0,C.lZ)(),{darkMode:s}=a;return(0,S.jsx)(d.A,{component:"th",width:r,py:1.5,px:3,sx:e=>{let{palette:{light:r},borders:{borderWidth:t}}=e;return{borderBottom:`${t[1]} solid ${r.main}`}},children:(0,S.jsxs)(d.A,{...i,position:"relative",textAlign:n,color:s?"white":"secondary",opacity:.7,sx:e=>{let{typography:{size:r,fontWeightBold:t}}=e;return{fontSize:r.xxs,fontWeight:t,textTransform:"uppercase",cursor:o&&"pointer",userSelect:o&&"none"}},children:[t,o&&(0,S.jsxs)(d.A,{position:"absolute",top:0,right:"right"!==n?"16px":0,left:"right"===n?"-5px":"unset",sx:e=>{let{typography:{size:r}}=e;return{fontSize:r.lg}},children:[(0,S.jsx)(d.A,{position:"absolute",top:-6,color:"asce"===o?"text":"secondary",opacity:"asce"===o?1:.5,children:(0,S.jsx)(A.A,{children:"arrow_drop_up"})}),(0,S.jsx)(d.A,{position:"absolute",top:0,color:"desc"===o?"text":"secondary",opacity:"desc"===o?1:.5,children:(0,S.jsx)(A.A,{children:"arrow_drop_down"})})]})]})})}T.defaultProps={width:"auto",sorted:"none",align:"left"};const P=T;function k(e){let{noBorder:r,align:t,children:o}=e;return(0,S.jsx)(d.A,{component:"td",textAlign:t,py:1.5,px:3,sx:e=>{let{palette:{light:t},typography:{size:o},borders:{borderWidth:n}}=e;return{fontSize:o.sm,borderBottom:r?"none":`${n[1]} solid ${t.main}`}},children:(0,S.jsx)(d.A,{display:"inline-block",width:"max-content",color:"text",sx:{verticalAlign:"middle"},children:o})})}k.defaultProps={noBorder:!1,align:"left"};const R=k;var E=t(4080),I=t(5333),_=t(4243),D=t(8217),z=t(995),O=t(7818),F=t(4735);function M(e){let{entriesPerPage:r,canSearch:t,showTotalEntries:a,table:s,pagination:l,isSorted:c,noEndBorder:h}=e;const{t:p}=(0,O.Bd)(),x=(0,o.useRef)(null),C=(0,n.wA)(),T=(0,i.Zp)(),k=(0,n.d4)((e=>e.language.direction)),[M,B]=(0,o.useState)(k);(0,o.useEffect)((()=>{B[k]}),[k]);const H=r.defaultValue?r.defaultValue:10,W=r.entries?r.entries.map((e=>e.toString())):["5","10","15","20","25"],U=(0,o.useMemo)((()=>s.columns),[s]),$=(0,o.useMemo)((()=>s.rows),[s]),N=(0,g.useTable)({columns:U,data:$,initialState:{pageIndex:0}},g.useGlobalFilter,g.useSortBy,g.usePagination),{getTableProps:J,getTableBodyProps:G,headerGroups:Y,prepareRow:L,rows:Z,page:q,pageOptions:V,canPreviousPage:Q,canNextPage:K,gotoPage:X,nextPage:ee,previousPage:re,setPageSize:te,setGlobalFilter:oe,state:{pageIndex:ne,pageSize:ie,globalFilter:ae}}=N;(0,o.useEffect)((()=>te(H||10)),[H]);const se=V.map((e=>(0,S.jsx)(y.A,{item:!0,onClick:()=>X(Number(e)),active:ne===e,children:e+1},e))),le=V.map((e=>e+1)),[ce,de]=(0,o.useState)(ae),ue=(0,g.useAsyncDebounce)((e=>{oe(e||void 0)}),100),he=e=>{let r;return r=c&&e.isSorted?e.isSortedDesc?"desc":"asce":!!c&&"none",r},pe=0===ne?ne+1:ne*ie+1;let xe;return xe=0===ne?ie:ne===V.length-1?Z.length:ie*(ne+1),(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(D.A,{color:"#f11946",ref:x,height:10,shadow:!1}),(0,S.jsxs)(b.A,{sx:{boxShadow:"none"},children:[r||t?(0,S.jsxs)(d.A,{display:"flex",justifyContent:"space-between",alignItems:"center",p:3,children:[r&&(0,S.jsxs)(d.A,{display:"flex",alignItems:"center",children:[(0,S.jsx)(j.A,{disableClearable:!0,value:ie.toString(),options:W,onChange:(e,r)=>{var t;t=parseInt(r,10),te(t)},size:"small",sx:{width:"5rem"},renderInput:e=>(0,S.jsx)(w.A,{...e})}),(0,S.jsxs)(u.A,{variant:"caption",color:"secondary",children:["\xa0\xa0",p("entriesPerPage")]})]}),t&&(0,S.jsx)(d.A,{width:"12rem",ml:"auto",children:(0,S.jsx)(w.A,{placeholder:p("search"),value:ce,size:"small",fullWidth:!0,onChange:e=>{let{currentTarget:r}=e;de(ce),ue(r.value)}})})]}):null,(0,S.jsxs)(m.A,{...J(),children:[(0,S.jsx)(d.A,{component:"thead",children:Y.map(((e,r)=>(0,S.jsxs)(v.A,{...e.getHeaderGroupProps(),children:[e.headers.map(((e,r)=>(0,S.jsx)(P,{...e.getHeaderProps(c&&e.getSortByToggleProps()),width:e.width?e.width:"auto",align:e.align?e.align:"left",sorted:he(e),children:e.render("Header")},r))),(0,S.jsx)(P,{children:p("action")})]},r)))}),(0,S.jsx)(f.A,{...G(),children:q.map(((e,r)=>(L(e),(0,S.jsxs)(v.A,{...e.getRowProps(),children:[e.cells.map(((e,t)=>(0,S.jsx)(R,{noBorder:h&&Z.length-1===r,align:e.column.align?e.column.align:"left",...e.getCellProps(),children:e.render("Cell")},t))),(0,S.jsx)(R,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,S.jsx)(I.A,{onClick:()=>{return r=e.original,void T(`${F.nk}/${r.ID}`,{state:{rowData:r}});var r},sx:{backgroundColor:"#1a73e8",color:"#fff",padding:"12px",borderRadius:"50%",boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease","&:hover":{backgroundColor:"#3084f2",transform:"scale(1.1)",boxShadow:"0px 6px 16px rgba(0, 0, 0, 0.3)"}},children:(0,S.jsx)(_.uO9,{size:20})}),(0,S.jsx)(z.A,{onDelete:()=>{return r=e.original,x.current.continuousStart(),void C((0,E.Wv)(r.ID)).finally((()=>{x.current.complete()}));var r}})]})})]},r))))})]}),(0,S.jsxs)(d.A,{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",sm:"center"},p:a||1!==V.length?3:0,children:[a&&(0,S.jsx)(d.A,{mb:{xs:3,sm:0},children:(0,S.jsxs)(u.A,{variant:"button",color:"secondary",fontWeight:"regular",children:[p("showing")," ",pe," ",p("to")," ",xe," ",p("of")," ",Z.length," ",p("entries")]})}),V.length>1&&(0,S.jsxs)(y.A,{variant:l.variant?l.variant:"gradient",color:l.color?l.color:"info",children:[Q&&(0,S.jsx)(y.A,{item:!0,onClick:()=>re(),children:(0,S.jsx)(A.A,{sx:{fontWeight:"bold"},children:"ltr"===M?"chevron_left":"chevron_right"})}),se.length>6?(0,S.jsx)(d.A,{width:"5rem",mx:1,children:(0,S.jsx)(w.A,{inputProps:{type:"number",min:1,max:le.length},value:le[ne],onChange:e=>{let{target:r}=e;return X(Number(r.value-1))}})}):se,K&&(0,S.jsx)(y.A,{item:!0,onClick:()=>ee(),children:(0,S.jsx)(A.A,{sx:{fontWeight:"bold"},children:"ltr"===M?"chevron_right":"chevron_left"})})]})]})]})]})}M.defaultProps={entriesPerPage:{defaultValue:5,entries:[5,10,15,20,25]},canSearch:!1,showTotalEntries:!0,pagination:{variant:"gradient",color:"info"},isSorted:!0,noEndBorder:!1};const B=M;var H=t(3784);const W=function(){const e=(0,n.d4)((e=>{var r;return null===e||void 0===e||null===(r=e.dataTable)||void 0===r?void 0:r.data}))||[],r=(0,o.useMemo)((()=>{return r=e,{columns:[{Header:H.ID,accessor:"ID"},{Header:H.FJ,accessor:"PROJECT_TYPE"},{Header:H.DH,accessor:"COUNTRY"},{Header:H.qA,accessor:"PAID_AMOUNT"},{Header:H.al,accessor:"PAYMENT_METHOD"},{Header:H.JZ,accessor:"FIRST_REPORT_STATUS"},{Header:H.TQ,accessor:"SECOND_REPORT_STATUS"},{Header:H.Gu,accessor:"THIRD_REPORT_STATUS"},{Header:H.BU,accessor:"PROJECT_STATUS"}],rows:null===r||void 0===r?void 0:r.map((e=>{var r;return{ID:e[H.Dq],PROJECT_TYPE:e[H.FJ],COUNTRY:e[H.DH],PAID_AMOUNT:null===(r=e[H.qA])||void 0===r?void 0:r.trim(),PAYMENT_METHOD:e[H.al],FIRST_REPORT_STATUS:e[H.JZ],SECOND_REPORT_STATUS:e[H.TQ],THIRD_REPORT_STATUS:e[H.Gu],PROJECT_STATUS:e[H.BU]}}))};var r}),[e]),t=(0,i.Zp)(),{t:g}=(0,O.Bd)(),m=(0,o.useCallback)((()=>{t(F.ol)}),[t]);return(0,S.jsxs)(h.A,{children:[(0,S.jsx)(p.A,{}),(0,S.jsx)(d.A,{pt:6,pb:3,children:(0,S.jsx)(d.A,{mb:3,children:(0,S.jsxs)(a.A,{children:[(0,S.jsx)(d.A,{p:3,lineHeight:1,children:(0,S.jsxs)(s.Ay,{container:!0,spacing:3,display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,S.jsxs)(s.Ay,{item:!0,xs:12,md:6,lg:6,children:[(0,S.jsx)(u.A,{variant:"h5",fontWeight:"medium",children:g("googleSheet1")}),(0,S.jsx)(u.A,{variant:"button",color:"text",children:g("googleSheet1Desc")})]}),(0,S.jsx)(s.Ay,{item:!0,xs:12,md:6,lg:6,display:"flex",justifyContent:"flex-end",children:(0,S.jsx)(l.A,{size:"large",startIcon:(0,S.jsx)(c.A,{}),variant:"contained",color:"primary",sx:{color:"#FFF"},onClick:m,children:g("add")})})]})}),(0,S.jsx)(B,{table:r,canSearch:!0,canModify:!0})]})})}),(0,S.jsx)(x.A,{})]})}}}]);