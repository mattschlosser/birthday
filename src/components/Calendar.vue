<template>
   <div id="app">
       <button  @click="() => { showDate.setMonth(showDate.getMonth()-1); showDate = new Date(showDate); }"> &lt; </button>
       <h1 style="display: inline-block; padding-left: 15px; padding-right: 15px;" class="center" contenteditable="true">{{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][showDate.getMonth()]}} {{showDate.getFullYear()}}</h1>

       <button  @click="() => { showDate.setMonth(showDate.getMonth()+1); showDate = new Date(showDate); }"> &gt; </button>
        <calendar-view
            :items="myItems"
            itemContentHeight="2.1em"
            :show-date="showDate"
            class="theme-default">
        </calendar-view>
    </div>
</template>
<script>
import { CalendarView } from "vue-simple-calendar"
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css")
function nth(date, year) {
    let y = year;
    let n = y - date.slice(0, 4);
    let th = '';
    let k = Number(String(n).slice(-2));
    let x = String(k).slice(-1);
    if (k >= 11 && k <= 13) {
        th = "th";
    } else if (x == 3) {
        th = "rd";
    } else if (x == 2) {
        th = "nd";
    } else if (x == 1) {
        th = "st";
    } else {
        th = "th";
    }
    return n + th;
}
export default {
    props: {
        items: Array,
        families: Array, 
        year: Number
    }, 
    data: function() {
        return { showDate: new Date(`${this.year}-01-02`) }
    },
    computed: {
        myItems() {
            return this.items.map((e, i) => {
                let d = `${this.year}-${e.date.slice(5)}`;
                return {
                    id: i, 
                    startDate:  d,
                    title: `${e.name}'s\n${nth(e.date, this.year)} ${e.type}`,
                    style: `color: ${this.families.find(r => r.name == e.fam).color}`,
                    classes: `${e.fam} ${d == `${this.year}-05-29` || d == `${this.year}-06-28` || d == `${this.year}-07-01`  || d == `${this.year}-07-20` || d == `${this.year}-07-24`   || d == `${this.year}-07-26` || d == `${this.year}-07-27`  ? 'tinier' : 'tiny'}`,
                    itemContentHeight: d == `${this.year}-05-29` || d == `${this.year}-06-28` || d == `${this.year}-07-01`  || d == `${this.year}-07-20` || d == `${this.year}-07-24` || d == `${this.year}-07-26` || d == `${this.year}-07-27` ? '2em' : '2.8em'
                }
            })
        }
    }, 
    components: {
        CalendarView
    },
    methods: {
        setShowDate(d) {
            this.showDate = d;
        },
    }
}
</script>
<style  scoped>
    #app {
        height: 130vh;
        font-size: 1.4rem;
        text-align: center;
    }
</style>
<style>
    .outsideOfMonth  {
       z-index: 99;
    }
    .cv-item {
        white-space: pre-wrap !important;
        font-weight: 800;;
        background: white !important;
        border: none !important;
    }
    .tiny {
        font-size: 1.2em !important;
    }
    .tinier {
        font-size: 1em !important;
    }
</style>