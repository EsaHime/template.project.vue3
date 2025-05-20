import { JsonProperty, Serializable, deserialize } from '@lancercomet/suntori'

@Serializable()
class User {
  @JsonProperty('name')
    username: string = ''

  @JsonProperty()
    gender: 'male' | 'female' = 'male'
}

const createUser = (dataSource: unknown) => {
  return deserialize(dataSource, User)
}

export {
  User,
  createUser
}
