import { useState } from "react";

// toggle button
export function Toggle({ classname }: { classname: string }) {
  const [toggle, setToggle] = useState(true);
  const toggleAnimation = "transform translate-x-[40px]";

  return (
    <div
      className={
        "flex w-[90px] h-[32px] bg-primary-500 rounded-full text-[14px] " +
        classname
      }
    >
      {/* Toggle Container */}
      <div
        className="w-[90px] h-[32px] bg-primary-500 rounded-full p-[3px] cursor-pointer flex relative"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {/* toggle false일 때 */}
        {toggle ? (
          <span className="absolute text-white left-[52px] top-[5px]">
            숨김
          </span>
        ) : (
          <span className="absolute text-white left-[10px] top-[5px]">
            공개
          </span>
        )}

        {/* Toggle true일 때*/}
        <div
          className={
            "bg-white h-[26px] w-[44px] rounded-full shadow-md transform duration-300 ease-in-out relative" +
            (toggle ? null : toggleAnimation)
          }
        >
          {toggle ? (
            <span className="pl-[9px] text-primary-500 absolute top-[3px]">
              공개
            </span>
          ) : (
            <span className="pl-[11px] text-primary-500 absolute top-[3px]">
              숨김
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ToggleNotText() {
  const [toggle, setToggle] = useState(true);
  const toggleAnimation = "transform translate-x-[11px]";

  return (
    <div className={"flex w-[25px] h-[14px] bg-primary-500 rounded-full"}>
      {/* Toggle Container */}
      <div
        className="w-[25px] h-[14px] bg-primary-500 rounded-full p-[2px] cursor-pointer flex relative"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {/* Toggle true일 때*/}
        <div
          className={
            "bg-white h-[11px] w-[11px] rounded-full shadow-md transform duration-300 ease-in-out relative" +
            (toggle ? null : toggleAnimation)
          }
        >
          {toggle ? (
            <span className="absolute top-[4px]"></span>
          ) : (
            <span className="absolute top-[4px]"></span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ToggleText({ toggleText }: { toggleText: string }) {
  const [toggle, setToggle] = useState(true);
  const toggleAnimation = "transform translate-x-[15px]";

  return (
    <div className="flex">
      <div
        className={
          "flex w-[36px] h-[21px] bg-primary-500 rounded-full mt-[2px] relative pb-[1px]"
        }
      >
        {/* Toggle Container */}
        <div
          className="w-[100%] h-[100%] bg-primary-500 rounded-full p-[2px] cursor-pointer flex"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {/* Toggle true일 때*/}
          <div
            className={
              "bg-white h-[16px] w-[16px] rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleAnimation)
            }
          ></div>
        </div>
      </div>
      <p className="ml-[8px]">
        {toggleText}
        {toggle ? " ON" : " OFF"}
      </p>
    </div>
  );
}
