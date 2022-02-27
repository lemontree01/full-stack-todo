import * as UserActionCreators from './userActionCreators'
import * as TodoActionCreators from './todosActionCreators'
import * as ThemeActionCreators from './themeActionCreators'
import * as ErrorsActionCreators from './errorsActionCreators'

export const ActionCreators = {
    ...UserActionCreators,
    ...TodoActionCreators,
    ...ThemeActionCreators,
    ...ErrorsActionCreators
}