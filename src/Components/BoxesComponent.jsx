
const BoxesComponent = () => {
        


  return (
    <>
      <div className="flex items-center justify-evenly mt-6">
        <div
          className="w-60 h-max p-8 border-2 border-purple-400 shadow-lg shadow-purple-500/50 rounded-lg text-center flex flex-col gap-1 catA"
          id="catA"
        ></div>
        <div
          className="w-60 h-max p-8 border-2 border-emerald-400 shadow-lg shadow-emerald-500/50 rounded-lg text-center flex flex-col gap-1 catB"
          id="catB"
        ></div>
        <div
          className="w-60 h-max p-8 border-2 border-amber-400 shadow-lg shadow-amber-500/50 rounded-lg text-center flex flex-col gap-1 catC"
          id="catC"
        ></div>
        <div
          className="w-60 h-max p-8 border-2 border-rose-400 shadow-lg shadow-rose-500/50 rounded-lg text-center	flex flex-col gap-1 catD"
          id="catD"
        ></div>
      </div>
      <div className="flex items-center justify-around mt-6">
        <div>Category A</div>
        <div>Category B</div>
        <div>Category C</div>
        <div>Category D</div>
      </div>
    </>
  );
};

export default BoxesComponent;
