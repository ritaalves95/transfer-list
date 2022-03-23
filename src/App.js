import './App.css';
import { useState } from 'react';
import items from './items.json';

function App() {
const [checkBox, setCheckBox] = useState([]);
const [list, setList] = useState([]);
const [listToDisplay, setListToDisplay] = useState([]);
const [listToRemove, setListToRemove] = useState([]);

//@   SET LIST
const handleChange = (e) => {
  setCheckBox({
      ...checkBox,
      [e.target.id]: e.target.checked
  })

  if(e.target.checked){
    setList([...list, e.target.value])
  }else{
    let newList = list.filter(item => item !== e.target.value);
    setList(newList)
  }
}

//@   SET LIST TO REMOVE
const changeList = (e) => {
  setCheckBox({
    ...checkBox,
    [e.target.id]: e.target.checked
})


  if(e.target.checked){
    setListToRemove([...listToRemove, e.target.value])

  }else{
    let newList = listToRemove.filter(item => item !== e.target.value);
    setListToRemove(newList)
  }
}

//@   DISPLAY LIST
  const displayList = (arr) => {
    setListToDisplay(arr);

    Object.keys(checkBox)
    .forEach(key => {
        checkBox[key] = checkBox[key] ? 'disabled' : null;
    })

  }

//@   REMOVE FROM DISPLAY IN RIGHT COLUMN
const removeList = () => {
  let newList = list.filter(item => !item.includes(listToRemove));
console.log('newList')
console.log(newList)
  Object.keys(checkBox)
  .forEach(key => {
      if(Number(key) && checkBox[key]){
          delete checkBox[key];
      }
      if(key.includes(listToRemove)){
        checkBox[key] = false;
      }
  })

  setList(newList);
  setListToDisplay(newList);
  setListToRemove([])
}

// console.log('list')
// console.log(list)
// console.log('checkBox')
// console.log(checkBox)
// console.log('listtoremove')
// console.log(listToRemove)
// console.log('display')
// console.log(listToDisplay)
  return (
    <div className="container">
            <div className="flex-wrapper">
                <div className="box-container">
                  <div className="box-container-options">
                    <h1>titulo</h1>
                      {items.map((item, index) => { 
                        return(
                          <article key={index}>
                              <label 
                                    htmlFor={item.languages} 
                                    className={checkBox[item.languages] === true ? 'checked' : checkBox[item.languages] === 'disabled' ? 'disabled' : ''}> 
                                    {item.languages} 
                              </label>
                              <input type="checkbox" 
                                      id={item.languages}
                                      value={item.languages} 
                                      onChange={handleChange} 
                                      checked={checkBox[item.languages] === true ? true : false}  
                                      disabled={checkBox[item.languages] === 'disabled' ? true : false}  
                                        />
                          </article>
                      )})}  
                  </div>
                </div>

                <article className="column-wrapper">
                    <i className="fas fa-chevron-right" onClick={() => displayList(list)}></i>
                    <i className="fas fa-chevron-left" onClick={removeList}></i>
                </article>

                <div className="box-container">
                  <div className="box-container-options">
                        <h1>titulo</h1>
                        {listToDisplay.map((item, index) => { 
                          return(
                            <article key={index}>
                              <label 
                                    htmlFor={index} 
                                    className={checkBox[index] === true ? 'checked' : ''}> 
                                    {item} 
                              </label>                                
                                <input type="checkbox" 
                                        id={index}
                                        value={item} 
                                        onChange={changeList} 
                                        checked={checkBox[index] === true ? true : false}  
                                          />
                            </article>
                        )})}  
                    </div>
                </div>
            </div>

    </div>
  );
}

export default App;
