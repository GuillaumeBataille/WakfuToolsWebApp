export default function HomeCenter() {
  return (
    <div className="font-subcontent w-fit mx-auto text-center">
      <h1 className="text-3xl mb-4">Liens utiles</h1>

      <ul className="font-content flex flex-col gap-2 mt-[50px]">
        <li>
          <a
            href="https://craftkfu.waklab.fr/?974"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 block border"
            target="_blank"
            rel="noopener noreferrer"
          >
            Craftku
          </a>
        </li>
        <li>
          <a
            href="https://wakfu.guide/"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 block border"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wakfu Guide
          </a>
        </li>
        <li>
          <a
            href="https://wakfu.guide/sublimations/"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 block border"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wakfu Guide - Sublimations
          </a>
        </li>
        <li>
          <a
            href="https://zenithwakfu.com/builder"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 block border"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wakfu Builder
          </a>
        </li>
      </ul>
    </div>
  );
}
