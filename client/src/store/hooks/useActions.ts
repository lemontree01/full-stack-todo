import {useDispatch} from "react-redux";
import {ActionCreators} from '../actionCreators/index'
import {bindActionCreators} from "redux";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}