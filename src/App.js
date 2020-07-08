import React, { useEffect, useState } from 'react';
import './App.css';
import Banner from './components/banner';
import axios from 'axios';

export default function App() {
  const [no2, setNo2] = useState(null);
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);
  //   const apiUrlProxied = 'https://www.stadtluft-anzeiger.de/getTreeLEDAPIv2.php?stationid=136-ringkirche';
  const api = 'https://api.stadtluft-anzeiger.de/api/v2/stations/136-ringkirche/measurements?limit=1';
  useEffect(() => {
    axios
      .get(api, { mode: 'no-cors' })
      .then(({ data }) => {
        const measured_at = new Date(data.data[0].measured_at.date);
        setNo2(data.data[0].no2);
        setTime(measured_at.getHours());
      })
      .catch(setError);
  }, []);

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!no2 || !time) return <div>loading</div>;

  return <Banner time={time} no2={no2} />;
}

// class App extends Component {
//   apiUrl = 'https://www.stadtluft-anzeiger.de/getTreeLEDAPIv2.php?stationid=136-ringkirche';
//   apiUrlProxied = 'https://cors-anywhere.herokuapp.com/https://www.stadtluft-anzeiger.de/getTreeLEDAPIv2.php?stationid=136-ringkirche';
//   state = {
//     no2: null,
//     time: null,
//   };

//   resolution = 'fullHD';
//   //resolution = 'ultraHD';

//   componentDidMount() {
//     fetch(this.apiUrlProxied)
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json);
//         this.setState({ no2: json.NO2, time: json.time });
//       })
//       .catch((e) => console.log(e));
//   }

//   render() {
//     const { no2, time } = this.state;
//     console.log(this.state);
//     return (
//       <div className={`App ${this.resolution}`}>
//         {!no2 && <h1 className="loadingTitle">LOADING...</h1>}
//         <Banner className={this.resolution} time={time} no2={no2} />
//       </div>
//     );
//   }
// }
