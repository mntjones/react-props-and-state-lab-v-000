import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  
  onChangeType = (val) => {
    // changes type using filter class
    this.setState({ filters: {type: val }});
  }
  
  onFindPetsClick = () => {
    let animal = this.state.filters.type;
    let results = "";
    // choosing which url based on the filter type
    if (animal === 'all'){
      results = '/api/pets';
    }
    else {
      results = `/api/pets?type=${animal}`;
    }
    
    fetch(results)
      .then(response => response.json())
      .then(data => this.setState({ pets: data }))
  }

  onAdoptPet = (petId) => {
    // this.state.pets is an array of pets
    const petsChange = this.state.pets.map(pet => { return pet.id === petId ? { ...pet, isAdopted: true } : pet; });
    // changes adopted state to true
    // updates pet array
    this.setState({ pets: petsChange });
  }
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
