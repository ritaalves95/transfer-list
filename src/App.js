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
    setList([]);
  }

//@   REMOVE FROM DISPLAY IN RIGHT COLUMN
const removeList = () => {
  let newList = listToDisplay.filter(item => !listToRemove.includes(item));

  Object.keys(checkBox)
  .forEach(key => {
      if(Number(key) && checkBox[key]){
          delete checkBox[key];
      }
      if(listToRemove.includes(key)){
        checkBox[key] = false;
      }
  })

  setList(newList);
  setListToDisplay(newList);
  setListToRemove([])
}

//@   CLEAR CONTENT FROM THE RIGHT COLUMN
  const clear = () => {
    setListToDisplay([]);
    setCheckBox([]);
  }

//@   SET COLUMN LEFT TO RIGHT
  const allIn = () => {
    let newList = [];
    let newCheckboxes
    items.forEach(item => {
      newList.push(item.languages)
      newCheckboxes = {...newCheckboxes, [item.languages]: 'disabled'}
    })

    setListToDisplay(newList)
    setCheckBox(newCheckboxes)
  }

  return (
    <div className="container">
            <div className="flex-wrapper">
                <div className="box-container">
                  <div className="box-container-options">
                    <h1>Choices</h1>
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
                  <button 
                      onClick={allIn}
                      >
                    <i className="fa-solid fa-angles-right"></i>
                  </button>
                  <button 
                      onClick={() => displayList(list)}
                      disabled={!list.length}
                      >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button 
                      onClick={removeList}
                      disabled={!listToRemove.length}
                      >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                      onClick={clear}
                      disabled={!listToDisplay.length}
                      >
                    <i className="fa-solid fa-angles-left"></i>
                  </button>
                </article>

                <div className="box-container">
                  <div className="box-container-options">
                        <h1>Choosen</h1>
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
