import "./App.css";
import { useState, useRef, useEffect } from "react";
import useDynamicWidth from "./hooks/useDynamicWidth";
import generateNumberList from "./utils/generateNumberList";

function App() {
  const [name, setName] = useState("");
  const [nameList, setList] = useState<string[]>([]);
  const [wrapNumber, setWrap] = useState<number>(0);

  const listContainerRef = useRef(null);
  let primaryList = useRef<HTMLDivElement>(null);
  let listThreeLastItemsRefs = useRef<HTMLDivElement>(null);

  function addName() {
    const newList = [...nameList, name];
    setList(newList);
    setName("");
  }
  function deleteItem(name: string) {
    const newList = nameList.filter((item) => item !== name);
    setList(newList);
  }

  const [ThreeLastItemsDynamicWidth] = useDynamicWidth(
    nameList,
    listThreeLastItemsRefs
  );
  const [primaryListDynamicWidth] = useDynamicWidth(nameList, primaryList);

  useEffect(() => {
    if (!listContainerRef.current) {
      console.log("listContainerRef.current is not exist");
      return;
    }
    if (wrapNumber == 0) {
      if (primaryListDynamicWidth > listContainerRef.current.offsetWidth - 50) {
        setWrap(nameList.length);
      }
    } else {
      if (wrapNumber > nameList.length) {
        setWrap(0);
      }
    }
  }, [nameList, ThreeLastItemsDynamicWidth, primaryListDynamicWidth]);

  var numToShowFromLastArr = generateNumberList(2).reverse();
  const subStrMaxNumber = 12;
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
          onChange={(e) => setName(e.target.value)}
        />{" "}
        &nbsp;
      </div>
      <br />

      <div className="list_container" ref={listContainerRef}>
        {wrapNumber == 0 && (
          <div
            className="primary_list"
            style={{ display: "flex" }}
            ref={primaryList}
          >
            {nameList.map((item, i) => (
              <>
                <div
                  className="list_Item"
                  key={i}
                  // ref={(el) => (el ? (listItemsRefs.current[i] = el) : null)}
                  onClick={() => deleteItem(item)}
                >
                  {item.length > subStrMaxNumber ? (
                    <>{item.substr(0, subStrMaxNumber - 1)}...</>
                  ) : (
                    item
                  )}
                </div>
                &nbsp;
              </>
            ))}
          </div>
        )}

        {wrapNumber > 0 && (
          <div className="list_three_container" ref={listThreeLastItemsRefs}>
            <div className="list_Item" key={1}>
              {nameList[0].length > subStrMaxNumber ? (
                <>{nameList[0].substr(0, subStrMaxNumber - 1)}...</>
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
                  {nameList[nameList.length - number].length >
                  subStrMaxNumber ? (
                    <>
                      {nameList[nameList.length - 1].substr(
                        0,
                        subStrMaxNumber - 1
                      )}{" "}
                      ...{" "}
                    </>
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
    </div>
  );
}

export default App;
