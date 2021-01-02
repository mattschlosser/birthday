<template>
  <div>
    <button class="btn" @click="reset">New</button>
    
    <button class="btn" @click="() => editing = !editing">Edit</button>
    <input type="file" class="btn" @click="load"/>
    <a  class="btn" :href="saveFile" target="_blank">Save</a>
    <div v-if="editing">
    <form @submit.prevent="addToList">
      <select v-model="type">
        <option value="Birthday">Birthday</option>
        <option>Anniversary</option>
      </select>
      <select v-model="family">
        <option v-for="fam in families" :key="fam">
          {{fam}}
        </option>
      </select>
      <input v-model="name">
      <input v-model="date" type="date">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(bday, i) in bdays" :key="i">
        {{bday.name}} - {{bday.date}} - {{bday.type}} - {{bday.fam}} <button type="button" @click="remove(i)">Delete</button>
      </li>
    </ul>
    </div>
    <calendar :items="bdays"/>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue';
if (!localStorage.birthdays) {
  localStorage.birthdays = JSON.stringify([])
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
    families: [
      "Alice", "Alvin", "Anne", "Ruby", "Erwin", "Donald", "Ken", "Evelyn", "Martha", "Caroline"
    ]
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
    addToList() {
      let {type, name, date, family:fam} = this;
      this.bdays.push({type, name, date, fam});
      localStorage.birthdays = JSON.stringify(this.bdays)
    },
    load(event) {
      console.log(event.target.file);
    },
    reset() {

    },
    remove(i) {
      this.bdays.splice(i, 1);
      localStorage.birthdays = JSON.stringify(this.bdays);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
