import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';

export const useAppSelector = <T>(selector: (state: RootState) => T): T => useSelector(selector);
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
