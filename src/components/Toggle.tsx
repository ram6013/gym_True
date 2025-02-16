"use client";

export default function Toggle({setSiesta, siesta}: {setSiesta: (siesta: boolean) => void, siesta: boolean}) {

  return (
<label className="inline-flex items-center mb-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onClick={() => setSiesta(!siesta)}/>
  <div className="relative w-9 h-5 bg-gray-200   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
</label>
  );
}
