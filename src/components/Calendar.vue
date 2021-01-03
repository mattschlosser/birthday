<template>
   <div id="app" @click="() => { showDate.setMonth(showDate.getMonth()+1); showDate = new Date(showDate); }">
       <h1 class="center" contenteditable="true">{{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][showDate.getMonth()]}} {{showDate.getFullYear()}}</h1>

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
function nth(date) {
    let y = new Date().getFullYear();
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
        families: Array
    }, 
    data: function() {
        return { showDate: new Date('2021-01-02') }
    },
    computed: {
        myItems() {
            return this.items.map((e, i) => {
                let d = `2021-${e.date.slice(5)}`;
                return {
                    id: i, 
                    startDate:  d,
                    title: `${e.name}'s\n${nth(e.date)} ${e.type}`,
                    style: `color: ${this.families.find(r => r.name == e.fam).color}`,
                    classes: `${e.fam} ${d == '2021-05-29' || d == '2021-06-28' || d == '2021-07-01'  || d == '2021-07-20' || d == '2021-07-24'   || d == '2021-07-26' || d == '2021-07-27'  ? 'tinier' : 'tiny'}`,
                    itemContentHeight: d == '2021-05-29' || d == '2021-06-28' || d == '2021-07-01'  || d == '2021-07-20' || d == '2021-07-24' || d == '2021-07-26' || d == '2021-07-27' ? '2em' : '2.8em'
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
        height: 100vh;
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