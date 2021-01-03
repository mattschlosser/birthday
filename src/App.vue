<template>
  <div id="app">
    <button class="btn" @click="reset">New</button>
    <button class="btn" @click="() => editing = !editing">Edit</button>
    <input type="file" class="btn" @change="load($event)"/>
    <a  class="btn" :href="saveFile" target="_blank">Save</a>
    <div v-if="editing">
      <h2 class="center">Families</h2>
      <form @submit.prevent="addFamily">
        <div>
          <label for="familyName">Family</label>
          <input name="familyName" v-model="familyName">
        </div>
        <div>
          <label for="color">Colour</label>
          <input name="color" v-model="color" type="color">
        </div>
      </form>
      <table style="width: 100%;">
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
    <form @submit.prevent="addToList">
      <div>
        <label for="type">Type</label>
        <select required name="type" v-model="type">
          <option value="Birthday">Birthday</option>
          <option>Anniversary</option>
        </select>
      </div>
      <div>
        <label for="family">Family</label>
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
    </form>
    <table style="width: 100%;"> 
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
    </div>
    <calendar :families="families" :items="bdays"/>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue';
if (!localStorage.birthdays) {
  localStorage.birthdays = JSON.stringify([])
}
if (!localStorage.families) {
  localStorage.families = JSON.stringify([]);
}
export default {
  components: { Calendar },
  name: 'HelloWorld',
  bdays: [],
  props: {
    msg: String
  },
  data: () => ({
    editing: false,
    type: "Birthday",
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
    addFamily() {
      let {familyName, color} = this;
      this.families.push({name: familyName, color});
      localStorage.families = JSON.stringify(this.families)
    },  
    addToList() {
      let {type, name, date, family:fam} = this;
      this.bdays.push({type, name, date, fam});
      localStorage.birthdays = JSON.stringify(this.bdays)
    },
    load(event) {
      const f = new FileReader();
      console.log(event.target.files);
      f.readAsText(event.target.files[0]);
      const vm = this;
      f.onload = function() {
        let it = JSON.parse(this.result);
        if (it.version === 1) {
          vm.fams = it.fams;
          vm.bdays = it.bdays;
          localStorage.birthdays = JSON.stringify(it.bdays);
          localStorage.families = JSON.stringify(it.fams);
        }
      }
    },
    reset() {
      this.bdays = [];
      this.families = [];
      localStorage.birthdays = "";
    },
    remove(i) {
      this.bdays.splice(i, 1);
      localStorage.birthdays = JSON.stringify(this.bdays);
    },
    removeFam(i) {
      this.families.splice(i, 1);
      localStorage.families = JSON.stringify(this.families);
    }
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
</style>
