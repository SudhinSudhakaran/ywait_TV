import {combineReducers} from 'redux';
import MenuReducer from './MenuReducer';
import TokenReducer from './TokenReducer';
import TvPointReducer from './TvPointReducer';
import LanguageReducer from './LanguageReducer';
import AlignmentReducer from './AlignmentReducer';
import SplitScreenReducer from './SplitScreenReducer';
import VoiceLanguageReducer from './VoiceLanguageReducer';
import DisplayLanguageReducer from './DisplayLanguageReducer';
import AnimationReducer from './AnimationReducer';
import DataListReducer from './DataListReducer';
import ShowLiveTokenReducer from './ShowLiveTokenReducer';
export default combineReducers({
  MenuState: MenuReducer,
  TokeState: TokenReducer,
  TvPointState: TvPointReducer,
  LanguageState: LanguageReducer,
  AlignmentState: AlignmentReducer,
  SplitScreenState: SplitScreenReducer,
  VoiceLanguageState: VoiceLanguageReducer,
  DisplayLanguageState: DisplayLanguageReducer,
  AnimationState: AnimationReducer,
  DataListState: DataListReducer,
  ShowLiveTokenState: ShowLiveTokenReducer,
});
