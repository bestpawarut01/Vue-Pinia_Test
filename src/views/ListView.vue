<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <h4 class="ma-2 pa-2">Add User Here --></h4>
        <v-btn 
          class="ma-2 pa-2"
          color="success"
          @click="dialogAddNew = true"
          >Add User</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th class="font-weight-bold">
                Name
              </th>
              <th class="font-weight-bold">
                Username
              </th>
              <th>
                Position
              </th>
              <th class="font-weight-bold">
                Edit user
              </th>
              <th class="font-weight-bold">
                Delete user
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item , index) in storeUser" :key="index">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.username }}
              </td>
              <td>
                {{ item.position }}
              </td>
              <td>
                <v-btn 
                color="secondary"
                @click="(dialogUpdateUser = true , setStateUpdate(item.username))"
                >Edit</v-btn>
              </td>
              <td>
                <v-btn 
                color="error"
                @click="setStateDelete(item.username)"
                > Delete </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog add new user -->
  <v-dialog v-model="dialogAddNew" max-width="500">
    <v-card height="230">
      <v-container>
        <v-row>
          <v-col class="d-flex align-center">
            <p>Name new user :</p>
            <v-text-field 
              max-width="400"
              class="pl-5"
              placeholder="Enter name user"
              hide-details
              v-model="newName"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex align-center">
            <p>Email new user :</p>
            <v-text-field 
              max-width="400"
              class="pl-5"
              placeholder="Enter email"
              hide-details
              v-model="newEmail"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn 
            color="primary" 
            @click="(addnewUser)"
            >submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <!-- Dialog add delete user -->
  <v-dialog v-model="dialogDeleteUser" max-width="500">
    <v-card height="150">
      <v-container>
        <v-row class="mt-3">
          <v-col class="d-flex justify-center">
            <p>Do you want to delete user "{{tempUserDelete}}" ?</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end" cols="9">
            <v-btn 
              @click="(dialogDeleteUser = false)"
              >Cancel
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end " cols="3">
            <v-btn 
            color="error" 
            @click="deleteUser(tempUserDelete)"
            >Delete</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <!-- Dialog Update user -->
  <v-dialog v-model="dialogUpdateUser" max-width="500">
    <v-card height="320">
      <v-container>
        <v-row>
          <v-col class="d-flex align-center">
            <p>Name :</p>
            <v-text-field 
              max-width="400"
              class="pl-5"
              placeholder=""
              hide-details
              v-model="nameUpdate"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex align-center">
            <p>Email :</p>
            <v-text-field 
              max-width="400"
              class="pl-5"
              placeholder=""
              :disabled = true
              hide-details
              v-model="emailUpdate"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex align-center">
            <p>position :</p>
            <v-text-field 
              max-width="400"
              class="pl-5"
              placeholder=""
              hide-details
              v-model="positionUpdate"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn 
            color="primary" 
            @click="updateUser(emailUpdate , nameUpdate , positionUpdate)"
            >submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user';
import { ref } from 'vue';

const UserStore = useUserStore();

let dialogDeleteUser = ref(false);
let dialogAddNew = ref(false);
let dialogUpdateUser = ref(false);

let newName = ref("")
let newEmail = ref("")
let tempUserDelete = ref("");
const nameUpdate = ref("");
const emailUpdate = ref("");
const positionUpdate = ref("");

//data user
let { storeUser } = storeToRefs(useUserStore());

//function add new user
const addnewUser = () =>{
  const tempAdd = {
    name: newName.value,
    position: "none",
    username: newEmail.value
  }
  
  UserStore.addNew(tempAdd)
  dialogAddNew.value = false
  newEmail.value = ""
  newName.value = ""
}

//function delete user
const setStateDelete = (username) => {
  tempUserDelete.value = username
  dialogDeleteUser.value = true;
}
const deleteUser = (username) => {
  UserStore.deleteUser(username)
  tempUserDelete.value = ""
  dialogDeleteUser.value = false
}

//function update user
const setStateUpdate = (username) => {
  const dataUpdate = UserStore.storeUser.find((item) => item.username == username);
  nameUpdate.value = dataUpdate.name
  emailUpdate.value = dataUpdate.username
  positionUpdate.value = dataUpdate.position
}
const updateUser = (username , newName , newPosition) => {
  const provideDate = {
    name: newName,
    position: newPosition
  }
  UserStore.updateUser(username , provideDate)
  dialogUpdateUser.value = false
}
</script>