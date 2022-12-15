import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchWord, setSearchWord] = useState<any>('');
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${searchWord}&format=json&origin=*`;

  const getText = (data: any) => {
    const words = data.replace(/(<([^>]+)>)/gi, "").replace(/\W/g, " ").replace(/\s\s+/g, ' ');
    countText(words.trim());
    console.log('words',words.trim());
  };

  function getData(e: { preventDefault: () => void; }){
    e.preventDefault();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('data' ,data);
        const key = Object.keys(data?.query.pages)[0];
        const html = data.query.pages[key].extract;
        html.split(' ');
        getText(html);
      })
  };

  function countText(text: string) {
    const words = text.split(' ');
    const count: any = {};

    for( let word of words ) {
      if(!count[word]) {
        count[word] = 1;
      } else {
        count[word]++;
      }
    }
    console.log('count text:', count)
  };

  return (
    <div className="App">
      <form>
        <input className='search' type="text" placeholder='Search...' value={searchWord} onChange={(e) => setSearchWord(e.target.value)}/>
        <button type='submit' onClick={getData}>Search</button>
      </form>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>5 Stars (*****)</th>
              <th>4 Stars (****)</th>
              <th>3 Stars (***)</th>
              <th>2 Stars (**)</th>
              <th>1 Stars (*)</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>5</td>
              <td>4</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default App;
