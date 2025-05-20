import { defineComponent, ref } from 'vue'
import { createUser } from '../modules/user'

const AppLayout = defineComponent({
  setup () {
    const username = ref('John Smith')
    const gender = ref<'male' | 'female'>('male')

    const onSubmit = (event: Event) => {
      event.preventDefault()

      const user = createUser({
        name: username.value,
        gender
      })

      console.log(user)
    }

    return () => (
      <div>
        <h1>Vue 3 Vite template</h1>
        <form onSubmit={onSubmit}>
          <div>
            <div>Username: {username.value}</div>
            <input v-model={username.value} type='text' />
          </div>

          <div>
            <div>Gender: {gender.value}</div>
            <label>
              <input v-model={gender.value} type='radio' value='male' />
              <span>Male</span>
            </label>

            <label>
              <input v-model={gender.value} type='radio' value='female' />
              <span>Female</span>
            </label>
          </div>

          <button>Submit</button>
        </form>
      </div>
    )
  }
})

export {
  AppLayout
}
