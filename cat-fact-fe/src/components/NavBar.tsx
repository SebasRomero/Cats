import NavBarLink from "./NavBarLink"

const NavBar = () => {
  return (
    <header className='w-full flex justify-center bg-orange-300 py-2'>
        <ul className="flex">
            <li>
                <NavBarLink name="Home" route="/"/>
            </li>
            <li>
                <NavBarLink name="Facts" route="/facts"/>
            </li>
            <li>
                <NavBarLink name="Create Fact" route="/create-fact"/>
            </li>
        </ul>
    </header>
  )
}

export default NavBar