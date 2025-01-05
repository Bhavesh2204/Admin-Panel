import React from 'react';

interface BoxProps {
  title: string;
  count: number;
  onClick: () => void;
  icon: React.ReactNode;
}

const InfoBox: React.FC<BoxProps> = ({ title, count, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center justify-center bg-white shadow-lg p-4 rounded-lg border hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-2 w-10 h-10">{icon}</div> {/* Placeholder for the logo */}
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-2xl font-semibold">{count}</p>
    </div>
  );
};

const ECommerce: React.FC = () => {
  const handleBoxClick = (boxName: string) => {
    console.log(`${boxName} clicked`);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5 2xl:gap-7.5">
        <InfoBox
          title="Employers"
          count={10}  
          icon={<svg> {/* Insert employer icon SVG here */} </svg>}
          onClick={() => handleBoxClick('Employers')}
        />
        <InfoBox
          title="Candidates"
          count={150}  
          icon={<svg> {/* Insert candidate icon SVG here */} </svg>} 
          onClick={() => handleBoxClick('Candidates')}
        />
        <InfoBox
          title="Jobs Applied"
          count={50}  
          icon={<svg> {/* Insert jobs applied icon SVG here */} </svg>} 
          onClick={() => handleBoxClick('Jobs Applied')}
        />
        <InfoBox
          title="Jobs Posted"
          count={30}  
          icon={<svg> {/* Insert jobs posted icon SVG here */} </svg>} 
          onClick={() => handleBoxClick('Jobs Posted')}
        />
        <InfoBox
          title="Incomplete Profiles"
          count={25}  
          icon={<svg> {/* Insert incomplete profiles icon SVG here */} </svg>} 
          onClick={() => handleBoxClick('Incomplete Profiles')}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:gap-7.5">
        {/* Large box for Applied Jobs */}
        <div className="flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-lg border">
          <h2 className="text-lg font-bold">Applied Jobs</h2>
          <p className="text-3xl font-semibold">{100}</p> {/* Replace with actual data */}
        </div>

        {/* Large box for Total Jobs */}
        <div className="flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-lg border">
          <h2 className="text-lg font-bold">Total Jobs</h2>
          <p className="text-3xl font-semibold">{200}</p> {/* Replace with actual data */}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
