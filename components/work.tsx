"use client";
import { useState } from "react";
import { frameWorksAndTools, languagesList, workHistory } from "./common";
import Project from "./project";

const WorkDetails = () => {
  enum TAB {
    WORK = 0,
    PROJECT,
  }
  const [selectedTab, setSelectedTab] = useState(TAB.WORK);

  const tabStyleClasses =
    "bg-white text-black px-5 py-1 border-b-4 border-purple-500";

  const WorkDetails = (
    <div className="flex justify-center  flex-wrap flex-grow wrapper">
      <div className=" border-white py-5 w-auto px-5 ">
        {workHistory.map((work, idx) => (
          <>
            <div key={idx} className="py-3 project">
              <div className="font-bold text-xl">{work.companyName}</div>
              {work.positionAndResponsibilities.map((PR, idx1) => (
                <div key={idx1} className="px-2 py-2">
                  <p className="text-lg">{PR.position}</p>
                  <p className="text-sm text-gray-400">{PR.duration}</p>
                  <ul className="list-disc px-6 py-2 leading-8 text-justify	">
                    {PR.responsibilities.map((responsibilities, idx2) => (
                      <li key={idx2}>{responsibilities}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
  return (
    <>
      <div
        id="work"
        className="flex gap-10 flex-wrap px-4 pb-8 items-center justify-around border-spacing-60 w-full"
      >
        <table className="table-fixed px-5">
          <thead className="border-b">
            <tr>
              <th className="py-2 text-left pl-2">Languages</th>
              <th className="py-2 text-left pl-2">Frameworks & Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr className="leading-7">
              <td className="pl-2 pr-6 pt-2">{languagesList}</td>
              <td className="pl-2 pr-6 pt-2">{frameWorksAndTools}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 place-items-center wrapper border-t  border-b py-4 cursor-pointer">
        <div
          onClick={() => setSelectedTab(TAB.WORK)}
          className={`${selectedTab === TAB.WORK ? tabStyleClasses : ""}`}
        >
          Work
        </div>
        <div
          onClick={() => setSelectedTab(TAB.PROJECT)}
          className={` ${selectedTab === TAB.PROJECT ? tabStyleClasses : ""}`}
        >
          Projects
        </div>
      </div>

      {selectedTab === TAB.WORK ? WorkDetails : <Project />}
    </>
  );
};

export default WorkDetails;
