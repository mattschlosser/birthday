<template>
  <div id="app">
    <h1 class="center">
      Simple Birthday Calendar
    </h1>
    <div class="container">
      <div class='left mb-3'>
        Add birthdays and anniversaries to this calendar. The calendar
        displays the events colour-coded by category, and automatically 
        shows the age the person is turning on that day (e.g. Bob's 1st Birthday)
      </div>
      <button class="btn" @click="askReset">Clear Everything</button>
      <button class="btn" @click="() => editing = !editing">Add Birthdays</button>
      <input  type="file" class="btn" @change="load($event)"/>
      <input type="number" v-model.lazy="year" @change="updateDate($event)" />
      <a  class="btn" :href="saveFile" target="_blank">Save</a>
      <button class="btn" type="button" @click="exportCal">Export</button>
    </div>
    <transition name="fade">
    <div v-if="editing">
      <h2 class="center">Categories</h2>
      <form @submit.prevent="addFamily">
        <div class="form">
          <div>
            <label for="familyName">Category</label>
            <input name="familyName" v-model="familyName">
          </div>
          <div>
            <label for="color">Colour</label>
            <input name="color" v-model="color" type="color">
            <button>Add Category</button>
          </div>
        </div>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fam, i) in families" :key="i">
            <td>{{fam.name}}</td>
            <td>{{fam.color}}</td>
            <td><button @click="removeFam(i)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <h2 class="center">Birthdays</h2>
      <template v-if="families.length">
        <form @submit.prevent="addToList">
          <div class="form">
            <div>
              <label for="type">Type</label>
              <select required name="type" v-model="type">
                <option value="Birthday">Birthday</option>
                <option>Anniversary</option>
              </select>
            </div>
            <div>
              <label for="family">Category</label>
              <select required name="family" v-model="family">
                <option v-for="fam in families" :key="fam">
                  {{fam.name}}
                </option>
              </select>
            </div>
            
            <div>
              <label for="name">Name</label>
              <input required name="name" v-model="name">
            </div>
            <div>
              <label for="date">Date</label>
              <input required v-model="date" type="date">
              <button type="submit">Add</button>
            </div>
          </div>
        </form>
      <table class="table"> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Family</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bday, i) in bdays" :key="i">
            <td>{{bday.name}}</td>
            <td>{{bday.date}}</td>
            <td>{{bday.type}}</td>
            <td>{{bday.fam}}</td>
            <td> <button type="button" @click="remove(i)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <div class="message">Before you can add birthdays, add at least one category</div>
    </template>
    </div>
    </transition>
    <div id="calendar">
      <calendar :hide-controls="hideControls" :families="families" ref="cal" :year="year" :items="bdays"/>
    </div>
  </div>
</template>

<script>
import Calendar from './components/CalendarComponent.vue';
import {jsPDF} from 'jspdf';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
if (!localStorage.birthdays) {
  localStorage.birthdays = JSON.stringify([])
}
if (!localStorage.families) {
  localStorage.families = JSON.stringify([]);
}
import html2canvas from 'html2canvas';
export default {
  components: { Calendar },
  name: 'HelloWorld',
  bdays: [],
  props: {
    msg: String, 
    margin: {
      type: Number, 
      default: 0.25 // inches
    }
  },
  data: () => ({
    editing: false,
    type: "Birthday",
    year: 2022,
    hideControls: false,
    name: '',
    date: '',
    bdays: JSON.parse(localStorage.birthdays),
    family: '',
    familyName: '', 
    color: '#fff', 
    families: JSON.parse(localStorage.families)
  }),
  computed: {
    saveFile() {
      let blob = new Blob([JSON.stringify({
        version: 1,
        fams: this.families, 
        bdays: this.bdays
      }, null, 2)], {type: "application/json"});
      return window.URL.createObjectURL(blob);
    }, 
  },
  methods: {
    updateDate(event) {
      this.$refs.cal.setShowDate(new Date(`${event.target.value}-01-02`));
    },
    /** 
     * Exports the current year loaded as a PDF, where each page is one month of the year. 
     */
    async exportCal() {
      // create the pdf
      let pdf = new jsPDF({
        orientation: "landscape", 
        unit: "in",
        format: "letter"
      })
      let date = new Date(`${this.year}-01-02`);
      this.hideControls = true;
      let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      for (let month of months) {
        // change to the next month
        date.setMonth(month);
        this.$refs.cal.setShowDate(new Date(date));
        await this.$nextTick();
        // generate a canvas of the calendar for the new month
        let canvas = await html2canvas(document.getElementById("calendar"), {
          height: 1840 * 8.5 /11,
          width: 1840,
        });
        // save the canvas as an image
        let img = canvas.toDataURL('image/webp', 0.9); 
        // add a new page if not the first month
        if (month !== 0) {
          pdf.addPage({
            orientation: "landscape", 
            format: "letter"
          })
        }
        // add the new image to the document
        pdf.addImage(img, 'WEBP', 0 + this.margin,0 + this.margin, 11 - this.margin * 2, 11 * canvas.height / canvas.width - this.margin * 2, null, 'FAST');
      }
      // save the pdf
      this.hideControls = false;
      pdf.save(`${this.year}.pdf`);
    },
    /**
     * Adds a family category to the list
     */
    addFamily() {
      let {familyName, color} = this;
      this.families.push({name: familyName, color});
      localStorage.families = JSON.stringify(this.families)
    },  
    /**
     * Removes a category/family from the list
     * 
     * @param {Number} i The index of the item to remove
     */
    removeFam(i) {
      this.families.splice(i, 1);
      localStorage.families = JSON.stringify(this.families);
    },
    /**
     * Adds a birthdate/anniversary
     */
    addToList() {
      let {type, name, date, family:fam} = this;
      this.bdays.push({type, name, date, fam});
      localStorage.birthdays = JSON.stringify(this.bdays)
      this.name = '';
      this.date = '';
    },
    /**
     * Removes a birthday from the list
     * 
     * @param {Number} i the index of the item to remove
     */
    remove(i) {
      this.bdays.splice(i, 1);
      localStorage.birthdays = JSON.stringify(this.bdays);
    },
    /**
     * Loads a saved file into the database
     */
    load(event) {
      const f = new FileReader();
      f.readAsText(event.target.files[0]);
      const vm = this;
      f.onload = function() {
        let it = JSON.parse(this.result);
        if (it.version === 1) {
          vm.families = it.fams;
          vm.bdays = it.bdays;
          localStorage.birthdays = JSON.stringify(it.bdays);
          localStorage.families = JSON.stringify(it.fams);
        }
      }
    },
    async askReset() {
      let res = await Swal.fire({
        title: "Reset calendar", 
        text: "This will remove all events/categories. Are you sure you want to continue?", 
        icon: "warning",
        showCancelButton: true, 
        confirmButtonText: "Reset", 
        focusCancel: true
      });
      if (!res.dismiss) {
        this.reset();
      }
    },
    /**
     * Clears all data in the database
     */
    reset() {
      this.bdays = [];
      this.families = [];
      localStorage.birthdays = "";
      localStorage.families = "";
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form div {
  max-width: 340px;
  margin: 7px auto;
}
form label {
  width: 30%;
  display: inline-block;
}
form input, form select {
  width: 70%;
  box-sizing: border-box;
}
form button {
  margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.center {
  text-align: center;
}
.message {
  background: lightblue;
  color: darkblue;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 4px 4px;
}
.form {
  padding: 15px;
  border:1px solid  #ccc;
  box-shadow: 5px 5px 10px #ccc;;
  box-sizing: border-box;
}
.table {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
.table th {
  background: lightgray;
}
.table td {
  padding: 5px;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-400px);
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter-active {
  transition-timing-function: ease-in;
}
.fade-leave-active {
  transition-timing-function: ease-out;
}
.btn {
  background-color: white;
  text-transform: uppercase;
  border: none;
  box-shadow: 4px 4px 8px #ccc;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: auto 6px; 
}
.left {
  text-align: left;
}
.container {
  width: 100%;
}
.btn:hover {
  background-color: #aaa;
}
@media screen and (min-width: 500px) {
  .table {
    margin: 0 auto;
    width: 50%;
  }
  .container {
    margin: 15px auto;
    width: 50%;
  }
}
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.mb-3 {
  margin-block-end: 1.2rem;
}
</style>
