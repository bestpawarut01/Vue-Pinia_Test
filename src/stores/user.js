import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let storeUser = reactive(
    [
      {
        name: 'pawarut narksuth',
        position: 'IT',
        username: 'pawarut.narksuth@gmail.com'
      },
      {
        name: 'best test',
        position: 'DevOps',
        username: 'bestkam.789@gmail.com'
      }
    ]
  )

  const addNew = (newUser) => {
    storeUser.push(newUser)
  }

  const deleteUser = (usernameDelete) => {
    const index = storeUser.findIndex( (item) => item.username === usernameDelete );
    if ( index !== -1 ){
      storeUser.splice(index ,1)
    }
  }

  const updateUser = (usernameUpdate , newUpdate) => {
    storeUser.find((item) => {
      if ( item.username === usernameUpdate ){
        item.name = newUpdate.name
        item.position = newUpdate.position
      }
    });

  }
  return {storeUser , addNew , deleteUser ,updateUser}
})
