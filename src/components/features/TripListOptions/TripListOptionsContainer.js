import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, addTag, removeTag, changeDuration} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  addTag: checked => dispatch(addTag(checked)),
  removeTag: checked => dispatch(removeTag(checked)),
  changeDuration: (type, value) => dispatch(changeDuration(type,value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
