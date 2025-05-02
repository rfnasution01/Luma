import { getLoadingSlice, setStateLoading } from '@/store/reducer/stateLoading'
import { useDispatch, useSelector } from 'react-redux'

export function useLoading() {
  const isLoading = useSelector(getLoadingSlice)?.isShow
  const dispatch = useDispatch()

  const setIsLoading = (state: boolean) => {
    dispatch(
      setStateLoading({
        isShow: state,
      }),
    )
  }

  return { isLoading, setIsLoading }
}
