(window.webpackJsonp=window.webpackJsonp||[]).push([[5,2,3],{233:function(t,e,r){"use strict";r.r(e);r(49);var l={name:"scrollToTop",data:function(){return{scTimer:0,scY:0}},mounted:function(){this.toTop(),window.addEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var t=this;this.scTimer||(this.scTimer=setTimeout((function(){t.scY=window.scrollY,clearTimeout(t.scTimer),t.scTimer=0}),100))},toTop:function(){window.scrollTo({top:0,behavior:"smooth"})}}},n=r(38),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"show",rawName:"v-show",value:t.scY>300,expression:"scY > 300"}],staticClass:"cursor-pointer animate__animated animate__bounceIn bg-second rounded-full m-7 fixed right-0 bottom-0",attrs:{id:"pagetop"},on:{click:t.toTop}},[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linecap":"square","stroke-linejoin":"arcs"}},[r("path",{attrs:{d:"M18 15l-6-6-6 6"}})])])}),[],!1,null,null,null);e.default=component.exports},234:function(t,e,r){"use strict";r.r(e);var l=r(6),n=(r(50),{name:"Profile",data:function(){return{finished:!1,lanyard:{},socket:null,scTimer:0,scY:0}},beforeDestroy:function(){var t;null===(t=this.socket)||void 0===t||t.close()},computed:{convertDiscordStatus:function(){switch(this.lanyard.discord_status){case"online":return"Çevrim içi";case"idle":return"Boşta";case"dnd":return"Rahatsız Etmeyin";default:return"Çevrim dışı"}},getDiscordStatus:function(){switch(this.lanyard.discord_status){case"online":return"bg-green-500";case"idle":return"bg-yellow-500";case"dnd":return"bg-red-500";default:return"bg-gray-500 dark:bg-gray-200"}}},mounted:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$lanyard({userId:"880603119740919879",socket:!0});case 2:t.socket=e.sent,null===(r=t.socket)||void 0===r||r.addEventListener("message",(function(e){var data=e.data,r=JSON.parse(data),l=r.t,n=r.d;"INIT_STATE"!==l&&"PRESENCE_UPDATE"!==l||(t.lanyard=n||{}),t.finished=!0}));case 4:case"end":return e.stop()}}),e)})))()}}),o=r(38),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.finished&&Object.keys(t.lanyard).length>1?r("div",{staticClass:"flex md:flex-row space-x-0 md:space-x-5 flex-col md:items-start md:justify-start justify-center items-center md:flex-row mt-4"},[r("img",{staticClass:"rounded-md mb-3 md:mt-0 w-40 h-40",attrs:{draggable:"false",src:"https://cdn.discordapp.com/avatars/"+t.lanyard.discord_user.id+"/"+t.lanyard.discord_user.avatar+".webp?size=4096"}}),t._v(" "),r("div",{staticClass:"flex md:text-left text-center md:items-start items-center flex-col"},[r("h1",{staticClass:"font-semibold text-3xl"},[t._v(t._s(t.lanyard.discord_user.username)+"#"+t._s(t.lanyard.discord_user.discriminator))]),t._v(" "),r("div",{staticClass:"flex mt-1 font-light text-center items-center"},[r("p",{class:"h-4 w-4 rounded-full mr-1 "+t.getDiscordStatus}),t._v(" "+t._s(t.convertDiscordStatus))]),t._v(" "),t.lanyard.listening_to_spotify?r("h1",{staticClass:"mt-1 font-light flex flex-row items-center"},[r("img",{staticClass:"w-4 h-4 mr-1",attrs:{src:"/assets/brands/spotify.svg",draggable:"false",alt:"spotify"}}),t._v(" Spotify Dinliyor")]):t._e(),t._v(" "),t.lanyard.spotify?r("div",{staticClass:"mt-2 flex md:flex-row flex-col md:items-start items-center"},[r("img",{staticClass:"spotify md:mb-0 mb-1 rounded-md",attrs:{src:""+t.lanyard.spotify.album_art_url,alt:"album",draggable:"false"}}),t._v(" "),r("div",{staticClass:"flex flex-col"},[r("p",{staticClass:"ml-3 whitespace-nowrap overflow-hidden w-52 overflow-ellipsis"},[t._v(t._s(t.lanyard.spotify.song))]),t._v(" "),r("p",{staticClass:"ml-3 whitespace-nowrap overflow-hidden w-52 overflow-ellipsis font-light text-sm"},[t._v(t._s(t.lanyard.spotify.artist))])])]):t._e(),t._v(" "),t.lanyard.listening_to_spotify?t._e():r("h1",{staticClass:"mt-1 font-light flex flex-row items-center"},[r("img",{staticClass:"w-4 h-4 mr-1",attrs:{src:"/assets/brands/spotify.svg",draggable:"false",alt:"spotify"}}),t._v(" Şu anda şarkı dinlemiyor")])])]):r("div",{staticClass:"flex md:flex-row space-x-0 md:space-x-5 flex-col md:items-start md:justify-start justify-center items-center md:flex-row mt-4"},[r("div",{staticClass:"rounded-md mb-3 md:mt-0 w-40 h-40 bg-second"}),t._v(" "),t._m(0)])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex text-left flex-col"},[r("div",{staticClass:"h-6 w-40 bg-second rounded"}),t._v(" "),r("div",{staticClass:"h-5 mt-2 w-32 bg-second rounded"})])}],!1,null,null,null);e.default=component.exports},235:function(t,e,r){"use strict";r.r(e);r(49);var l={name:"homepage",head:function(){return{title:"Ana sayfa"}},data:function(){return{scTimer:0,scY:0}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var t=this;this.scTimer||(this.scTimer=setTimeout((function(){t.scY=window.scrollY,clearTimeout(t.scTimer),t.scTimer=0}),100))}}},n=r(38),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ScrollButton"),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"flex flex-col text-white text-center items-center justify-center"},[r("h1",{staticClass:"md:text-5xl text-4xl"},[t._v("Hakkımda")]),t._v(" "),r("div",{staticClass:"mt-10 mb-20 flex text-center items-center md:flex-row flex-col md:space-x-20 space-x-0 justify-center"},[r("p",{staticClass:"md:mb-0 mb-10 md:w-2/6 w-8/12 text-white text-center md:text-lg text-base whitespace-pre-wrap"},[t._v("Selam, ben Mustafa Genç. 21 yaşındayım. Bolu Abant İzzet Baysal Üniversitesi Grafik Tasarım bölümünden 2022 senesinde mezun oldum. Tasarım ile 6, yazılım ile yaklaşık 4 senedir ilgileniyorum. Projelerimi daha iyi sunmak için bulduğum her alanda kendimi geliştiriyorum. Geliştirmekte olduğum projeler milyonlarca kullanıcıya hizmet etmekte.")]),t._v(" "),r("Profile")],1)])],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col text-white items-center justify-center h-screen"},[r("div",{staticClass:"flex main flex-col"},[r("h1",{staticClass:"md:text-9xl text-5xl font-medium"},[t._v("Merhaba ben")]),t._v(" "),r("h1",{staticClass:"md:text-9xl text-5xl font-semibold text-red-700"},[t._v("TheM4F")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{ScrollButton:r(233).default,Profile:r(234).default})}}]);