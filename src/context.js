import React, { Component } from 'react';
import items from './data';
const RoomContext = React.createContext();
class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    price: 0,
    size: 0,
    minPrice: 0,
    maxPrice: 0,
    breakfast: false,
    capacity: 1,
    minSize: 0,
    maxSize: 0,
    pets: false,
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      featuredRooms,
      sortedRooms: rooms,
      rooms,
      loading: false,
      price: maxPrice,
      maxSize,
      maxPrice,
    });
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checked' ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, pets, breakfast } = this.state;
    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);
    // maxSize = parseInt(maxSize);

    // filter by size
    tempRooms = tempRooms.filter((room) => room.size >= minSize && room.size <= maxSize);

    // filter by breakfast

    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    // filter by
    if (price !== 600) {
      tempRooms = tempRooms.filter((room) => room.price <= price);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  };
  render() {
    return <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>{this.props.children}</RoomContext.Provider>;
  }
}

const RoomConsumer = RoomContext.Consumer;

// setting higher order functions for room consumer
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>{(value) => <Component {...props} context={value} />}</RoomConsumer>;
  };
}

export { RoomProvider, RoomContext, RoomConsumer };
