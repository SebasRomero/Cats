
interface NavBarLinkProps {
    name: string
    route: string
}

const NavBarLink = (props: NavBarLinkProps) => {
  return (
    <div className="py-2 px-1">
        <a className="mx-2 px-2 py-4 hover:bg-orange-200" href={props.route}>{props.name}</a>
    </div>
  )
}

export default NavBarLink