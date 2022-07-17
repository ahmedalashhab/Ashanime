/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAppDispatch} from '../../redux/store'
import {setGenre} from "../../redux/search-slice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function GenreDropDown() {
  const dispatch = useAppDispatch()

  const genreList = [
    "action",
    "adventure",
    "cars",
    "comedy",
    "dementia",
    "demons",
    "drama",
    "family",
    "fantasy",
    "game",
    "gourmet",
    "harem",
    "historical",
   "horror",
    "josei",
    "kids",
    "magic",
    "martial-arts",
    "mecha",
    "military",
    "mystery",
    "parody",
    "police",
    "psychological",
    "romance",
    "samurai",
    "school",
    "sci-fi",
    "seinen",
    "shoujo",
    "shounen",
    "slice-of-Life",
    "space",
    "sports",
    "super-power",
    "supernatural",
    "suspense",
    "thriller",
    "vampire",
  ]

  const handleList = () =>  genreList.map((genre: string) => {
    return <Menu.Item>
      {({ active }) => (
        <span
          onClick={() => {
            dispatch(setGenre(genre))}
          }
          className={classNames(
            active ? ' cursor-pointer bg-gray-100 text-gray-900' : 'cursor-pointer text-gray-700',
            'block px-4 py-2 text-sm'
          )}
        >
          {genre}
        </span>
      )}
    </Menu.Item>
  })

    return (
      <Menu as="div" className="relative inline-block text-left z-index-102">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Genre
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="h-96 overflow-scroll origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                  {handleList()}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
}

