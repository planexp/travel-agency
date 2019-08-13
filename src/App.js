import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
import CountriesContainer from './components/views/Countries/CountriesContainer';
import RegionsContainer from './components/views/Regions/RegionsContainer';
import Info from './components/views/Info/Info';
import TripContainer from './components/views/Trip/TripContainer';
import CountryContainer from './components/views/Country/CountryContainer';
import NotFound from './components/views/NotFound/NotFound';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';
import {AnimatedSwitch} from 'react-router-transition';
import styles from './App.scss';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render(){
    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch location={location}
          atEnter={{ opacity: 0, top: 200 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1, top: 0 }}
          className={styles.switchWrapper}
          >
            <Route exact path='/' component={Home} />
            <Route exact path='/trips' component={Trips} />
            <Route path='/trip/:id' component={TripContainer} />
            <Route exact path='/countries' component={CountriesContainer} />
            <Route path='/country/:countryCode' component={CountryContainer} />
            <Route exact path='/regions' component={RegionsContainer} />
            <Route exact path='/info' component={Info} />
            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
