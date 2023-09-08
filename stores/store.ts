import { defineStore, acceptHMRUpdate } from "pinia";

export const useStackStore = defineStore({
  id: "stack-order",

  state: () => {
    return {
      stackOrder: {
        "musings": 0,
        "contact": 1,
        "essays": 2
      }
    }
  },

  actions: {
    updateStackOrder(order: number[]) {
      this.stackOrder = {
        "musings": order.indexOf(0),
        "contact": order.indexOf(1),
        "essays": order.indexOf(2)
      }
    }
  }
})

 if(import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useStackStore, import.meta.hot))
}
