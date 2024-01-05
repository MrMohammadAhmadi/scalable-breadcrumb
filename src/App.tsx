import "./App.css";
import React, { useState, useRef, useEffect, useCallback } from "react";

function App() {
  const [name, setName] = useState("");
  const [nameList, setList] = useState<string[]>([]);
  const [wrapNumber, setWrap] = useState<number>(0);
  const [numToShowFromLast, setNumToShowFromLast] = useState<number>(3);

  const listContainerRef = useRef(null);
  let listItemsRefs = useRef<HTMLDivElement[]>([]);
  let listThreeLastItemsRefs = useRef<HTMLDivElement>(null);

  function setNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function addName() {
    const newList = [...nameList, name];
    setList(newList);
    setName("");
  }
  function deleteItem(name: string) {
    const newList = nameList.filter((item) => item !== name);
    setList(newList);
    setNumToShowFromLast(3);
  }
  // ---------------------------------------------
  const [width, setWidth] = useState(0);

  // Function to handle the resizing of the element
  const handleResize = useCallback((entries: any) => {
    const { contentRect } = entries[0];
    setWidth(contentRect.width);
  }, []);

  // Attach a ResizeObserver to the element when it mounts
  useEffect(() => {
    if (!listThreeLastItemsRefs.current) {
      return;
    }
    const element = listThreeLastItemsRefs.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);

    // Cleanup the observer when the component unmounts
    return () => {
      resizeObserver.unobserve(element);
    };
  }, [handleResize, nameList, wrapNumber]);

  // Access the width using the ref and update it when it changes
  useEffect(() => {
    if (wrapNumber != 0 && listThreeLastItemsRefs.current) {
      const element = listThreeLastItemsRefs.current;
      if (element) {
        setWidth(element.getBoundingClientRect().width);
      }
    }
  }, [wrapNumber]);

  // ------------------------------------------------

  useEffect(() => {
    let totalWidth: number = 0;
    if (!listContainerRef.current) {
      console.log("listContainerRef.current is not exist");
      return;
    }

    listItemsRefs.current = listItemsRefs.current.filter((val, idx, []) => {
      if (nameList.indexOf(val.outerText) !== -1) {
        totalWidth += val.offsetWidth;
        return val;
      }
    });
    console.log("totalWidth", totalWidth);
    if (wrapNumber == 0) {
      if (totalWidth > listContainerRef.current.offsetWidth - 50) {
        setWrap(nameList.length);
      }
    } else {
      if (wrapNumber > nameList.length) {
        setWrap(0);
        setNumToShowFromLast(3);
      }
      if (width > listContainerRef.current.offsetWidth - 50) {
        setNumToShowFromLast(2);
      }
    }
  }, [nameList, width]);

  function generateNumberList(number: number) {
    var numberList = [];
    for (var i = 1; i <= number; i++) {
      numberList.push(i);
    }
    return numberList;
  }
  var numToShowFromLastArr = generateNumberList(numToShowFromLast).reverse();

  return (
    <div>
      <br />
      <div className="addName">
        <input
          type="text"
          className="btn"
          value={name}
          onKeyDown={(e) => {
            if (e.key === "Enter") addName();
          }}
          onChange={(e) => setNameHandler(e)}
        />{" "}
        &nbsp;
      </div>
      <br />
      <br />
      <div className="list_container" ref={listContainerRef}>
        {wrapNumber == 0 &&
          nameList.map((item, i) => (
            <>
              <div
                className="list_Item"
                key={i}
                ref={(el) => (el ? (listItemsRefs.current[i] = el) : null)}
                onClick={() => deleteItem(item)}
              >
                {item.length > 10 ? <>{item.substr(0, 9)}...</> : item}
              </div>
              &nbsp;
            </>
          ))}

        {wrapNumber > 0 && (
          <div className="list_three_container" ref={listThreeLastItemsRefs}>
            <div className="list_Item" key={1}>
              {nameList[0].length > 15 ? (
                <>{nameList[0].substr(0, 14)}...</>
              ) : (
                nameList[0]
              )}
            </div>
            <span style={{ margin: "10px" }}>...</span>
            {numToShowFromLastArr.map((number) => (
              <>
                <div
                  className="list_Item"
                  onClick={() => deleteItem(nameList[nameList.length - number])}
                >
                  {nameList[nameList.length - number].length > 10 ? (
                    <>{nameList[nameList.length - 1].substr(0, 9)} ... </>
                  ) : (
                    nameList[nameList.length - number]
                  )}
                </div>
                &nbsp;
              </>
            ))}
          </div>
        )}
      </div>
      <br />
      {/* wrapNumber : {wrapNumber}
      <br />
      parent Size :{" "}
      {listContainerRef.current && listContainerRef.current.offsetWidth}
      <br /> */}
    </div>
  );
}

export default App;
